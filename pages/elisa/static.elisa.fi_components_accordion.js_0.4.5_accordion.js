$(document).ready(function () {

  //This sets the max height to accordion opened by default
  $.map($('.ea-accordion__element.ea-accordion__element--expanded'), function (accordionElement) {
    initializeAccordionContentMaxHeight($(accordionElement))
  })

  $('.ea-accordion')
    .on('click', '.ea-accordion__header', function (event) {
      event.preventDefault()
      let accordionElement = $(this).closest('.ea-accordion__element')
      accordionElement.toggleClass('ea-accordion__element--expanded')
      initializeAccordionContentMaxHeight(accordionElement)
    })
  $('.ea-accordion__inner')
    .on('click', '.ea-accordion__header', function (event) {
      event.preventDefault()
      let accordionElement = $(this).parent('.ea-accordion__element')
      accordionElement.toggleClass('ea-accordion__element--expanded')
  })
  $('body')
   .off('click.accordionClick')
   .on('click.accordionClick', '.content-toggleable .toggle', function(event) {
    event.preventDefault()
    let container = findContainer($(this))
    if (container.hasClass('closed')) {
      expandToggle(container)
    } else {
      closeToggle(container)
    }
  })

  if ("onhashchange" in window) {
    $(window).one("hashchange", expandAnchored)
  }

  window.addEventListener("hashchange", function() {
    if (window.location.hash == '' || window.location.hash == '#') {
    } else {
    $(window).one("hashchange", expandAnchored)
    }
  });

  expandAnchored()

  function expandAnchored() {
    let anchorElement = document.getElementById(document.location.hash.replace('#', ''))
    expandToggle(findContainer($(anchorElement)), true)
  }

  function closeToggle(container) {
    let content = findContent(container)
    content.slideUp('fast', function() {
      container.addClass('closed').removeClass('expanded')
    })
  }

  function expandToggle(container, hashChange) {
    (container.hasClass('ea-accordion__element')) ? (container.addClass('ea-accordion__element--expanded'), initializeAccordionContentMaxHeight(container))
      : container.removeClass('closed').addClass('expanded')
    let content = findContent(container)
    // animations modify the element's overflow, need to capture the overflow before animating to preserve it
    let originalOverflow = content.css('overflow')
    if(hashChange) {
      scrollToElement(content)
    }
    content.slideDown('fast', function() {
      content.css('overflow', originalOverflow)
    })
  }

  function scrollToElement(element) {
    if($(element).offset()) {
      $('html, body').animate({
        scrollTop: $(element).offset().top - 100
      }, 100);
    }
  }

  function findContent(container) {
    return (container.hasClass('ea-accordion__element')) ? container.find('.ea-accordion__content') : container.find('.content')
  }

  function findContainer(elem) {
    return (elem.is('.ea-accordion__content, .ea-accordion__header')) ? elem.parent('.ea-accordion__element') : elem.filter('.toggle').closest('.content-toggleable')
  }

  function initializeAccordionContentMaxHeight(accordionElement) {
    let accordionContentHeight = 0
    $.map(accordionElement.filter('.ea-accordion__element--expanded').find('.ea-accordion__content').children(), function (innerElement) {
      accordionContentHeight += $(innerElement).outerHeight()
    })
    accordionContentHeight = accordionContentHeight * 2 // to be on the safer side
    accordionElement.filter(':not(.ea-accordion__element--expanded)').find('.ea-accordion__content:first').css('max-height', 0)
    accordionElement.filter('.ea-accordion__element--expanded').find('.ea-accordion__content:first').css('max-height', accordionContentHeight)
  }
})