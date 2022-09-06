// Copyright © Stripe, Inc
//
// @package    StripeIntegration_Payments
// @version    2.5.7

var stripeTokens = {};

var initStripe = function(params, callback)
{
    if (typeof callback == "undefined")
        callback = null;

    stripe.useSetupIntents = params.useSetupIntents;

    require(['stripejs', 'domReady!', 'mage/mage', 'mage/url', 'mage/storage'], function(stripejs, domReady, mage, urlBuilder, storage)
    {
        stripe.urlBuilder = urlBuilder;
        stripe.storage = storage;
        stripe.initStripeJs(params.apiKey, params.locale, callback);
    });
};

// Global Namespace
var stripe =
{
    // Properties
    version: "2.5.7",
    quote: null, // Comes from the checkout js
    customer: null, // Comes from the checkout js
    multiShippingFormInitialized: false,
    applePayButton: null,
    applePaySuccess: false,
    applePayResponse: null,
    card: null,
    stripeJs: null,
    apiKey: null,
    isCreatingToken: false,
    multiShippingForm: null,
    multiShippingFormSubmitButton: null,
    token: null,
    sourceId: null,
    response: null,
    iconsContainer: null,
    paymentIntent: null,
    paymentIntents: [],
    concludedPaymentIntents: [],
    isAdmin: false,
    urlBuilder: null,
    storage: null,
    prButton: null,
    adminSourceOwner: null,
    PRAPIEvent: null,
    paymentRequest: null,
    setupIntentClientSecret: null,
    useSetupIntents: false,
    isFetchingSetupIntent: false,

    // Methods
    initStripeJs: function(apiKey, locale, callback)
    {
        var message = null;

        if (!stripe.stripeJs)
        {
            try
            {
                stripe.stripeJs = Stripe(apiKey);
            }
            catch (e)
            {
                if (typeof e != "undefined" && typeof e.message != "undefined")
                    message = 'Could not initialize Stripe.js: ' + e.message;
                else
                    message = 'Could not initialize Stripe.js';
            }
        }

        if (callback)
            callback(message);
        else if (message)
            stripe.displayCardError(message);
    },

    setSetupIntentClientSecret: function(clientSecret)
    {
        if (typeof clientSecret != "string")
            return;

        if (clientSecret.length == 0)
            return;

        stripe.setupIntentClientSecret = clientSecret;
    },

    onWindowLoaded: function(callback)
    {
        if (window.attachEvent)
            window.attachEvent("onload", callback); // IE
        else
            window.addEventListener("load", callback); // Other browsers
    },
    getStripeElementsStyle: function()
    {
        // Custom styling can be passed to options when creating an Element.
        return {
            base: {
                // Add your base input styles here. For example:
                fontSize: '16px',
                // lineHeight: '24px'
                // iconColor: '#c4f0ff',
                // color: '#31325F'
        //         fontWeight: 300,
        //         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',

        //         '::placeholder': {
        //             color: '#CFD7E0'
        //         }
            }
        };
    },
    getStripeElementCardNumberOptions: function()
    {
        return {
            // iconStyle: 'solid',
            // hideIcon: false,
            style: stripe.getStripeElementsStyle()
        };
    },
    getStripeElementCardExpiryOptions: function()
    {
        return {
            style: stripe.getStripeElementsStyle()
        };
    },
    getStripeElementCardCvcOptions: function()
    {
        return {
            style: stripe.getStripeElementsStyle()
        };
    },
    initStripeElements: function(locale)
    {
        if (document.getElementById('stripe-payments-card-number') === null)
            return;

        if (!stripe.stripeJs)
            return;

        var elements = stripe.stripeJs.elements({
            locale: locale
        });

        var cardNumber = stripe.card = elements.create('cardNumber', stripe.getStripeElementCardNumberOptions());
        cardNumber.mount('#stripe-payments-card-number');
        cardNumber.addEventListener('change', stripe.stripeElementsOnChange);

        var cardExpiry = elements.create('cardExpiry', stripe.getStripeElementCardExpiryOptions());
        cardExpiry.mount('#stripe-payments-card-expiry');
        cardExpiry.addEventListener('change', stripe.stripeElementsOnChange);

        var cardCvc = elements.create('cardCvc', stripe.getStripeElementCardCvcOptions());
        cardCvc.mount('#stripe-payments-card-cvc');
        cardCvc.addEventListener('change', stripe.stripeElementsOnChange);
    },
    stripeElementsOnChange: function(event)
    {
        if (typeof event.brand != 'undefined')
            stripe.onCardNumberChanged(event.brand);

        if (event.error)
            stripe.displayCardError(event.error.message, true);
        else
            stripe.clearCardErrors();
    },
    onCardNumberChanged: function(cardType)
    {
        stripe.onCardNumberChangedFade(cardType);
        stripe.onCardNumberChangedSwapIcon(cardType);
    },
    resetIconsFade: function()
    {
        stripe.iconsContainer.className = 'input-box';
        var children = stripe.iconsContainer.getElementsByTagName('img');
        for (var i = 0; i < children.length; i++)
            children[i].className = '';
    },
    onCardNumberChangedFade: function(cardType)
    {
        if (!stripe.iconsContainer)
            stripe.iconsContainer = document.getElementById('stripe-payments-accepted-cards');

        if (!stripe.iconsContainer)
            return;

        stripe.resetIconsFade();

        if (!cardType || cardType == "unknown") return;

        var img = document.getElementById('stripe_payments_' + cardType + '_type');
        if (!img) return;

        img.className = 'active';
        stripe.iconsContainer.className = 'input-box stripe-payments-detected';
    },
    cardBrandToPfClass: {
        'visa': 'pf-visa',
        'mastercard': 'pf-mastercard',
        'amex': 'pf-american-express',
        'discover': 'pf-discover',
        'diners': 'pf-diners',
        'jcb': 'pf-jcb',
        'unknown': 'pf-credit-card',
    },
    onCardNumberChangedSwapIcon: function(cardType)
    {
        var brandIconElement = document.getElementById('stripe-payments-brand-icon');
        var pfClass = 'pf-credit-card';
        if (cardType in stripe.cardBrandToPfClass)
            pfClass = stripe.cardBrandToPfClass[cardType];

        for (var i = brandIconElement.classList.length - 1; i >= 0; i--)
            brandIconElement.classList.remove(brandIconElement.classList[i]);

        brandIconElement.classList.add('pf');
        brandIconElement.classList.add(pfClass);
    },
    toggleSubscription: function(selector, edit)
    {
        var elements = jQuery(selector);
        if (elements.length === 0) return;

        for (var i = 0; i < elements.length; i++)
        {
            var section = elements[i];
            if (stripe.hasClass(section, 'show'))
            {
                stripe.removeClass(section, 'show');
                if (edit) stripe.removeClass(section, 'edit');
            }
            else
            {
                stripe.addClass(section, 'show');
                if (edit) stripe.addClass(section, 'edit');
            }
        }

        return false;
    },

    editSubscription: function(selector)
    {
        var elements = jQuery(selector);
        if (elements.length === 0) return;

        for (var i = 0; i < elements.length; i++)
        {
            var section = elements[i];
            if (!stripe.hasClass(section, 'edit'))
                stripe.addClass(section, 'edit');
        }
    },

    cancelEditSubscription: function(selector)
    {
        var elements = jQuery(selector);
        if (elements.length === 0) return;

        for (var i = 0; i < elements.length; i++)
        {
            var section = elements[i];
            stripe.removeClass(section, 'edit');
        }
    },

    hasClass: function(element, className)
    {
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    },

    removeClass: function (element, className)
    {
        if (element.classList)
            element.classList.remove(className);
        else
        {
            var classes = element.className.split(" ");
            classes.splice(classes.indexOf(className), 1);
            element.className = classes.join(" ");
        }
    },

    addClass: function (element, className)
    {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += (' ' + className);
    },

    // Admin

    initRadioButtons: function()
    {
        // Switching between saved cards and new card
        var i, inputs = document.querySelectorAll('#saved-cards input');

        for (i = 0; i < inputs.length; i++)
            inputs[i].onclick = stripe.useCard;
    },

    disableStripeInputValidation: function()
    {
        var i, inputs = document.querySelectorAll(".stripe-input");
        for (i = 0; i < inputs.length; i++)
            $(inputs[i]).removeClassName('required-entry');
    },

    enableStripeInputValidation: function()
    {
        var i, inputs = document.querySelectorAll(".stripe-input");
        for (i = 0; i < inputs.length; i++)
            $(inputs[i]).addClassName('required-entry');
    },

    // Triggered when the user clicks a saved card radio button
    useCard: function(evt)
    {
        var element = document.getElementById('payment_form_stripe_payments_payment');

        if (!element)
            element = document.getElementById('payment_form_stripe_payments'); // admin area

        // User wants to use a new card
        if (this.value == 'new_card')
        {
            stripe.addClass(element, "stripe-new");
            stripe.enableStripeInputValidation();
            deleteStripeToken();
        }
        // User wants to use a saved card
        else
        {
            stripe.removeClass(element, "stripe-new");
            stripe.disableStripeInputValidation();
            setStripeToken(this.value);
        }

        stripe.sourceId = stripe.cleanToken(stripe.getSelectedSavedCard());
    },
    getSelectedSavedCard: function()
    {
        var elements = document.getElementsByName("payment[cc_saved]");
        if (elements.length == 0)
            return null;

        var selected = null;
        for (var i = 0; i < elements.length; i++)
            if (elements[i].checked)
                selected = elements[i];

        if (!selected)
            return null;

        if (selected.value == 'new_card')
            return null;

        return selected.value;
    },

    initPaymentFormValidation: function()
    {
        // Adjust validation if necessary
        var hasSavedCards = document.getElementById('new_card');

        if (hasSavedCards)
        {
            var paymentMethods = document.getElementsByName('payment[method]');
            for (var j = 0; j < paymentMethods.length; j++)
                paymentMethods[j].addEventListener("click", stripe.toggleValidation);
        }
    },

    toggleValidation: function(evt)
    {
        $('new_card').removeClassName('validate-one-required-by-name');
        if (evt.target.value == 'stripe_payments')
            $('new_card').addClassName('validate-one-required-by-name');
    },

    initMultiplePaymentMethods: function(selector)
    {
        var wrappers = document.querySelectorAll(selector);
        var countPaymentMethods = wrappers.length;
        if (countPaymentMethods < 2) return;

        var methods = document.querySelectorAll('.indent-target');
        if (methods.length > 0)
        {
            for (var i = 0; i < methods.length; i++)
                this.addClass(methods[i], 'indent');
        }
    },

    placeAdminOrder: function()
    {
        var radioButton = document.getElementById('p_method_stripe_payments');
        if (radioButton && !radioButton.checked)
            return order.submit();

        createStripeToken(function(err)
        {
            if (err)
                alert(err);
            else
                order.submit();
        });
    },

    initAdminStripeJs: function()
    {
        // Stripe.js intercept when placing a new order
        var btn = document.getElementById('order-totals');
        if (btn) btn = btn.getElementsByTagName('button');
        if (btn && btn[0]) btn = btn[0];
        if (btn) btn.onclick = stripe.placeAdminOrder;

        var topBtn = document.getElementById('submit_order_top_button');
        if (topBtn) topBtn.onclick = stripe.placeAdminOrder;
    },

    getSourceOwner: function()
    {
        if (stripe.adminSourceOwner)
            return stripe.adminSourceOwner;

        var owner = {
            name: null,
            email: null,
            phone: null,
            address: {
                city: null,
                country: null,
                line1: null,
                line2: null,
                postal_code: null,
                state: null
            }
        };

        if (stripe.quote)
        {
            var billingAddress = stripe.quote.billingAddress();
            var name = billingAddress.firstname + ' ' + billingAddress.lastname;
            owner.name = name;
            if (stripe.quote.guestEmail)
                owner.email = stripe.quote.guestEmail;
            else
                owner.email = stripe.customer.customerData.email;
            owner.phone = billingAddress.telephone;

            var street = [];

            // Mageplaza OSC delays to set the street because of Google autocomplete,
            // but it does set the postcode correctly, so we temporarily ignore the street
            if (billingAddress.street && billingAddress.street.length > 0)
                street = billingAddress.street;

            owner.address.line1 = (street.length > 0 ? street[0] : null),
            owner.address.line2 = (street.length > 1 ? street[1] : null),
            owner.address.city = billingAddress.city || null,
            owner.address.state = billingAddress.region || null,
            owner.address.postal_code = billingAddress.postcode || null,
            owner.address.country = billingAddress.countryId || null
        }

        if (!owner.phone)
            delete owner.phone;

        return owner;
    },

    // Triggered from the My Saved Cards section
    saveCard: function(saveButton)
    {
        saveButton.disabled = true;

        createStripeToken(function(err)
        {
            if (err)
            {
                alert(err);
                saveButton.disabled = false;
            }
            else
                document.getElementById('payment_form_stripe_payments_payment').submit();
        });

        return false;
    },

    initAdminEvents: function()
    {
        stripe.initRadioButtons();
        stripe.initPaymentFormValidation();
        stripe.initMultiplePaymentMethods('.admin__payment-method-wapper');
    },

    initMultiShippingEvents: function()
    {
        stripe.initRadioButtons();
        stripe.initMultiplePaymentMethods('.methods-payment .item-title');
        stripe.initMultiShippingForm();
    },

    // Multi-shipping form support for Stripe.js
    submitMultiShippingForm: function(e)
    {
        var el = document.getElementById('p_method_stripe_payments');
        if (el && !el.checked)
            return true;

        if (e.preventDefault) e.preventDefault();

        stripe.multiShippingFormSubmitButton = document.getElementById('payment-continue');

        if (stripe.multiShippingFormSubmitButton)
            stripe.multiShippingFormSubmitButton.disabled = true;

        createStripeToken(function(err)
        {
            if (stripe.multiShippingFormSubmitButton)
                stripe.multiShippingFormSubmitButton.disabled = false;

            if (err)
                alert(err);
            else
            {
                if (typeof stripe.multiShippingForm == "undefined" || !stripe.multiShippingForm)
                    stripe.initMultiShippingForm();

                stripe.multiShippingForm.submit();
            }
        });

        return false;
    },

    initMultiShippingForm: function()
    {
        if (stripe.multiShippingFormInitialized) return;

        stripe.multiShippingForm = document.getElementById('multishipping-billing-form');
        if (!stripe.multiShippingForm) return;

        stripe.multiShippingForm.onsubmit = stripe.submitMultiShippingForm;

        stripe.multiShippingFormInitialized = true;
    },

    clearCardErrors: function()
    {
        var box = document.getElementById('stripe-payments-card-errors');

        if (box)
        {
            box.innerHTML = '';
            box.classList.remove('populated');
        }
    },

    setLoadWaiting: function(section)
    {
        // Dummy method from M1
    },

    displayCardError: function(message)
    {
        message = stripe.maskError(message);

        // When we use a saved card, display the message as an alert
        var newCardRadio = document.getElementById('new_card');
        if (newCardRadio && !newCardRadio.checked)
        {
            alert(message);
            return;
        }

        var box = document.getElementById('stripe-payments-card-errors');

        if (box)
        {
            box.innerHTML = message;
            box.classList.add('populated');
        }
        else
            alert(message);
    },

    maskError: function(err)
    {
        var errLowercase = err.toLowerCase();
        var pos1 = errLowercase.indexOf("Invalid API key provided".toLowerCase());
        var pos2 = errLowercase.indexOf("No API key provided".toLowerCase());
        if (pos1 === 0 || pos2 === 0)
            return 'Invalid Stripe API key provided.';

        return err;
    },
    shouldSaveCard: function()
    {
        var saveCardInput = document.getElementById('stripe_payments_cc_save');

        if (!saveCardInput)
            return false;

        return saveCardInput.checked;
    },
    handleCardPayment: function(done)
    {
        try
        {
            stripe.closePaysheet('success');

            stripe.stripeJs.handleCardPayment(stripe.paymentIntent).then(function(result)
            {
                if (result.error)
                    return done(result.error.message);

                return done();
            });
        }
        catch (e)
        {
            done(e.message);
        }
    },
    handleCardAction: function(done)
    {
        try
        {
            stripe.closePaysheet('success');

            stripe.stripeJs.handleCardAction(stripe.paymentIntent).then(function(result)
            {
                if (result.error)
                    return done(result.error.message);

                return done();
            });
        }
        catch (e)
        {
            done(e.message);
        }
    },
    processNextAuthentication: function(done)
    {
        if (stripe.paymentIntents.length > 0)
        {
            stripe.paymentIntent = stripe.paymentIntents.pop();
            stripe.authenticateCustomer(stripe.paymentIntent, function(err)
            {
                if (err)
                    done(err);
                else
                    stripe.processNextAuthentication(done);
            });
        }
        else
        {
            stripe.paymentIntent = null;
            return done();
        }
    },
    authenticateCustomer: function(paymentIntentId, done)
    {
        try
        {
            stripe.stripeJs.retrievePaymentIntent(paymentIntentId).then(function(result)
            {
                if (result.error)
                    return done(result.error);

                if (result.paymentIntent.status == "requires_action"
                    || result.paymentIntent.status == "requires_source_action")
                {
                    if (result.paymentIntent.confirmation_method == "manual")
                        return stripe.handleCardAction(done);
                    else
                        return stripe.handleCardPayment(done);
                }

                return done();
            });
        }
        catch (e)
        {
            done(e.message);
        }
    },
    isNextAction3DSecureRedirect: function(result)
    {
        if (!result)
            return false;

        if (typeof result.paymentIntent == 'undefined' || !result.paymentIntent)
            return false;

        if (typeof result.paymentIntent.next_action == 'undefined' || !result.paymentIntent.next_action)
            return false;

        if (typeof result.paymentIntent.next_action.use_stripe_sdk == 'undefined' || !result.paymentIntent.next_action.use_stripe_sdk)
            return false;

        if (typeof result.paymentIntent.next_action.use_stripe_sdk.type == 'undefined' || !result.paymentIntent.next_action.use_stripe_sdk.type)
            return false;

        return (result.paymentIntent.next_action.use_stripe_sdk.type == 'three_d_secure_redirect');
    },
    paymentIntentCanBeConfirmed: function()
    {
        // If stripe.sourceId exists, it means that we are using a saved card source, which is not going to be a 3DS card
        // (because those are hidden from the admin saved cards section)
        return !stripe.sourceId;
    },

    // Converts tokens in the form "src_1E8UX32WmagXEVq4SpUlSuoa:Visa:4242" into src_1E8UX32WmagXEVq4SpUlSuoa
    cleanToken: function(token)
    {
        if (typeof token == "undefined" || !token)
            return null;

        if (token.indexOf(":") >= 0)
            return token.substring(0, token.indexOf(":"));

        return token;
    },
    closePaysheet: function(withResult)
    {
        try
        {
            if (stripe.PRAPIEvent)
                stripe.PRAPIEvent.complete(withResult);
            else if (stripe.paymentRequest)
                stripe.paymentRequest.abort();
        }
        catch (e)
        {
            // Will get here if we already closed it
        }
    },
    isAuthenticationRequired: function(msg)
    {
        stripe.paymentIntent = null;

        // 500 server side errors
        if (typeof msg == "undefined")
            return false;

        // Case of subscriptions
        if (msg.indexOf("Authentication Required: ") === 0)
        {
            stripe.paymentIntents = msg.substring("Authentication Required: ".length).split(",");
            return true;
        }

        return false;
    },
    createPaymentMethod: function(done)
    {
        var data = {
            billing_details: stripe.getSourceOwner()
        };

        stripe.stripeJs.createPaymentMethod('card', stripe.card, data).then(function(result)
        {
            if (result.error)
                return done(result.error.message);

            var cardKey = result.paymentMethod.id;
            var token = result.paymentMethod.id + ':' + result.paymentMethod.card.brand + ':' + result.paymentMethod.card.last4;
            stripeTokens[cardKey] = token;
            setStripeToken(token, result.paymentMethod);

            return done();
        });
    },
    setupCard: function(done)
    {
        var clientSecret = stripe.setupIntentClientSecret;

        if (!clientSecret)
            return done("Could not use SetupIntents to authenticate the card.");

        var options = {
            payment_method: {
                card: stripe.card,
                billing_details: stripe.getSourceOwner()
            }
        };
        stripe.stripeJs.confirmCardSetup(clientSecret, options).then(function(result)
        {
            if (result.error)
                return done(result.error.message);

            // If there is any type of payment error at the order placement step, we will need a fresh setupintent for the next request
            stripe.refreshSetupIntent(true);

            var cardKey = result.setupIntent.payment_method;
            var token = result.setupIntent.payment_method + '::';
            stripeTokens[cardKey] = token;
            setStripeToken(token, result.paymentMethod);

            return done();
        });
    },
    refreshSetupIntent: function(refresh)
    {
        if (!stripe.useSetupIntents)
            return;

        if (stripe.setupIntentClientSecret && !refresh)
            return;

        if (stripe.isFetchingSetupIntent)
            return;

        require(['mage/url', 'mage/storage', 'Magento_Customer/js/customer-data', 'Magento_Checkout/js/model/quote'], function(urlBuilder, storage, customerData, quote)
        {
            var cart = customerData.get('cart');

            if (cart().items.length == 0)
                return;

            stripe.urlBuilder = urlBuilder;
            stripe.storage = storage;

            var serviceUrl = stripe.urlBuilder.build('/rest/V1/stripe/payments/get_setup_intent', {});
            var self = this;
            var payload = {
                customerData: {
                    guestEmail: quote.guestEmail,
                    billingAddress: quote.billingAddress()
                }
            };

            if (!payload.customerData.billingAddress)
                return;

            stripe.setupIntentClientSecret = null;
            stripe.isFetchingSetupIntent = true;

            return stripe.storage.post(
                serviceUrl,
                JSON.stringify(payload),
                false
            )
            .fail(function(xhr, textStatus, errorThrown)
            {
                console.error("Could not retrieve SetupIntent: " + xhr.responseText);
                stripe.isFetchingSetupIntent = false;
            })
            .done(function (response)
            {
                stripe.setSetupIntentClientSecret(response);
                stripe.isFetchingSetupIntent = false;
            });
        });
    }
};

var createStripeToken = function(callback)
{
    stripe.clearCardErrors();
    stripe.setLoadWaiting('payment');

    var done = function(err)
    {
        stripe.setLoadWaiting(false);
        return callback(err, stripe.token, stripe.response);
    };

    if (stripe.applePaySuccess)
    {
        return done();
    }

    // First check if the "Use new card" radio is selected, return if not
    var cardDetails, newCardRadio = document.getElementById('new_card');
    if (newCardRadio && !newCardRadio.checked)
    {
        if (stripe.sourceId)
            setStripeToken(stripe.sourceId);
        else
            return done("No card specified");

        return done(); // We are using a saved card token for the payment
    }

    try
    {
        if (stripe.setupIntentClientSecret)
            stripe.setupCard(done);
        else
            stripe.createPaymentMethod(done);
    }
    catch (e)
    {
        return done(e.message);
    }
};

function setStripeToken(token, response)
{
    stripe.token = token;
    if (response)
        stripe.response = response;
    try
    {
        var input, inputs = document.getElementsByClassName('stripe-stripejs--token');
        if (inputs && inputs[0]) input = inputs[0];
        else input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", "payment[cc_stripejs_token]");
        input.setAttribute("class", 'stripe-stripejs--token');
        input.setAttribute("value", token);
        input.disabled = false; // Gets disabled when the user navigates back to shipping method
        var form = document.getElementById('payment_form_stripe_payments_payment');
        if (!form) form = document.getElementById('co-payment-form');
        if (!form) form = document.getElementById('order-billing_method_form');
        if (!form) form = document.getElementById('onestepcheckout-form');
        if (!form && typeof payment != 'undefined') form = document.getElementById(payment.formId);
        if (!form)
        {
            form = document.getElementById('new-card');
            input.setAttribute("name", "newcard[cc_stripejs_token]");
        }
        form.appendChild(input);
    } catch (e) {}
}

function deleteStripeToken()
{
    stripe.token = null;
    stripe.response = null;

    var input, inputs = document.getElementsByClassName('stripe-stripejs--token');
    if (inputs && inputs[0]) input = inputs[0];
    if (input && input.parentNode) input.parentNode.removeChild(input);
}
