"use strict";(self.webpackChunkmobile=self.webpackChunkmobile||[]).push([[7463],{46787:(e,t,s)=>{s.d(t,{Z:()=>n});const n=s.p+"images/AuroraLogo-01343a.svg"},86411:(e,t,s)=>{s.d(t,{Z:()=>n});const n=s.p+"images/IndeedJapanLogo-618554.svg"},42856:(e,t,s)=>{s.r(t),s.d(t,{default:()=>i});var n=s(23645),a=s.n(n)()((function(e){return e[1]}));a.push([e.id,".jobsearch-ExternalLink{font-weight:bold;line-height:20px;margin-top:24px;display:inline-block}.jobsearch-ExternalLink svg{vertical-align:top;margin:0 0 0 8px;width:1.25rem;height:1.25rem}.jobsearch-ExternalLink svg path{fill:currentColor}",""]);const i=a},77689:(e,t,s)=>{s.d(t,{Z:()=>i,x:()=>a});var n=s(67294);const a=e=>"DESKTOP_EMBEDDED"===e,i=e=>a(e.viewJobDisplay)?n.createElement("style",null,e.css.toString()," "):null},82366:(e,t,s)=>{s.d(t,{Z:()=>b});var n=s(67294),a=s(98181),i=s(30554),o=s(78154),l=s(77689),c=Object.defineProperty,r=Object.defineProperties,p=Object.getOwnPropertyDescriptors,d=Object.getOwnPropertySymbols,h=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable,g=(e,t,s)=>t in e?c(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;const m=s(42856),b=e=>{const t=((0,l.x)(e.viewJobDisplay)||e.openInNewTab)&&{target:"_blank",rel:"noopener"};return n.createElement(n.Fragment,null,n.createElement(l.Z,{css:m,viewJobDisplay:e.viewJobDisplay}),n.createElement(a.k,null,n.createElement(i.rU,(s=((e,t)=>{for(var s in t||(t={}))h.call(t,s)&&g(e,s,t[s]);if(d)for(var s of d(t))u.call(t,s)&&g(e,s,t[s]);return e})({href:e.url,onClick:e.onClick,className:`${e.className||""} jobsearch-ExternalLink`},t),c={iconAfter:n.createElement(o.Y,null)},r(s,p(c))),e.children)));var s,c}},78438:(e,t,s)=>{s.r(t),s.d(t,{default:()=>v});var n=s(67294),a=s(51818),i=s(80300),o=s(6249),l=s(97672),c=s(46787);const r=s.p+"images/third-party-apply-before-you-leave-v2-x2-1a2832.png",p=s.p+"images/third-party-apply-before-you-leave-v2-x3-2865de.png",d=s.p+"images/third-party-apply-before-you-leave-v2-cf2725.png";var h=s(6754),u=s(82366),g=s(77367);const m=s.p+"images/AppleLogo-2cd704.svg",b=s.p+"images/FacebookLogo-672508.svg",f=s.p+"images/GoogleLogo-3577da.svg",y=({onClick:e,socialSignInModel:{signInSeparatorText:t,googleSignInButtonText:s,appleSignInButtonText:i,facebookSignInButtonText:o,facebookAltLogoText:l,googleAltLogoText:c,appleAltLogoText:r},baseClassName:p})=>n.createElement(n.Fragment,null,n.createElement("div",{className:`${p}-divider`},n.createElement("hr",{className:`${p}-hr ${p}-hrLeft`}),n.createElement("span",{className:`${p}-dividerText`},t),n.createElement("hr",{className:`${p}-hr ${p}-hrRight`})),n.createElement(a.default,{size:"lg",buttonType:"tertiary",onClick:()=>e(g.bp.GOOGLE),className:`${p}-createAccount ${p}-socialCreateAccount`,"data-testid":`${p}-google-button`},n.createElement("img",{src:f,className:`${p}-socialLogo`,alt:c}),n.createElement("span",{className:`${p}-socialCreateAccountText`},s)),n.createElement(a.default,{size:"lg",buttonType:"tertiary",onClick:()=>e(g.bp.APPLE),className:`${p}-createAccount ${p}-socialCreateAccount`,"data-testid":`${p}-apple-button`},n.createElement("img",{src:m,className:`${p}-socialLogo`,alt:r}),n.createElement("span",{className:`${p}-socialCreateAccountText`},i)),n.createElement(a.default,{size:"lg",buttonType:"tertiary",onClick:()=>e(g.bp.FACEBOOK),className:`${p}-createAccount ${p}-socialCreateAccount`,"data-testid":`${p}-facebook-button`},n.createElement("img",{src:b,className:`${p}-socialLogo`,alt:l}),n.createElement("span",{className:`${p}-socialCreateAccountText`},o))),E="MOBILE";class x extends n.Component{constructor(e){super(e),this.handleCreateAccountClick=this.handleCreateAccountClick.bind(this),this.handleContinueToApplyClick=this.handleContinueToApplyClick.bind(this),this.handleSignInClick=this.handleSignInClick.bind(this),this.handleExit=this.handleExit.bind(this),this.state={isOpen:!0}}componentDidMount(){const{logger:e}=this.context;(0,g.hl)(e)(E)}componentDidUpdate(e){this.props.displayCount&&this.props.displayCount!==e.displayCount&&this.setState({isOpen:!0})}handleCreateAccountClick(e){const{logger:t}=this.context;(0,g.Bw)(t)(E,e),window.location.assign(this.props.createAccountPassportURL)}handleContinueToApplyClick(){const{logger:e}=this.context;(0,g.K3)(e)(E)}handleSignInClick(){const{logger:e}=this.context;(0,g.tS)(e)(E)}handleExit(){if(this.state.isOpen){this.setState({isOpen:!1});const{logger:e}=this.context;(0,g.r2)(e)(E)}}render(){if(!this.state.isOpen)return null;const e="jobsearch-MobileThirdPartyApplyCreateAccountModal",t=this.props.socialSignInModel,s=this.props.alwaysIntercept;return n.createElement("div",{className:e,"data-testid":"createAccountModal"},n.createElement(o.M,null,n.createElement(i.default,{title:n.createElement("img",{src:c.Z,className:"icl-Logo--wordmark--md",alt:"Indeed"}),isOpen:this.state.isOpen,onExit:this.handleExit,closeAriaLabel:this.props.closeAriaText,id:e,className:s?"always-intercept":""},n.createElement("div",{className:`${e}-container`},!t&&n.createElement("div",{className:`${e}-image`},n.createElement("img",{src:d,srcSet:`${d},\n                                           ${r} 2x,\n                                           ${p} 3x`,alt:""})),n.createElement("div",{className:`${e}-title`},this.props.titleText),n.createElement("div",{className:`${e}-text`},t?t.createAccountLongReasonText:this.props.createAccountReasonText),n.createElement(a.default,{size:"lg",isBlock:!0,onClick:()=>this.handleCreateAccountClick(g.bp.INDEED),className:`${e}-createAccount`},this.props.createAccountButtonText,s&&n.createElement("div",{className:`${e}-spacer`},n.createElement(l.o,{size:"md"}))),t&&n.createElement(y,{onClick:this.handleCreateAccountClick,socialSignInModel:t,baseClassName:e}),s&&n.createElement("div",{className:`${e}-signinFooter`},n.createElement("div",{className:`${e}-signinlabel`},this.props.haveAnAccountText," ",n.createElement("a",{href:this.props.accountSignInPassportURL,className:`${e}-signinlink`,onClick:this.handleSignInClick},this.props.signInText)),n.createElement("div",{className:`${e}-subtext icl-u-xs-mt--lg`},this.props.createAccountBottomText)),!s&&n.createElement(u.Z,{url:this.props.thirdPartyURL,onClick:this.handleContinueToApplyClick,viewJobDisplay:this.props.viewJobDisplay,className:`${e}-continueToApplication`,openInNewTab:this.props.openInNewTab},this.props.continueButtonText)))))}}x.contextType=h.Z;const v=x},96007:(e,t,s)=>{s.r(t),s.d(t,{default:()=>P});var n=s(67294),a=s(51818),i=s(20635),o=s(80300),l=s(6249),c=s(46787),r=s(86411);const p=s.p+"images/jp-mobile-successful-signin-v2-x2-c9ef0c.png",d=s.p+"images/jp-mobile-successful-signin-v2-x3-988d03.png",h=s.p+"images/jp-mobile-successful-signin-v2-1ff8d5.png",u=s.p+"images/mobile-successful-signin-v2-x2-9438c8.png",g=s.p+"images/mobile-successful-signin-v2-x3-357c2e.png",m=s.p+"images/mobile-successful-signin-v2-1a2ac6.png";var b=s(94184),f=s.n(b),y=s(6754);const E=()=>window.matchMedia("(orientation: landscape)").matches?"landscape":"portrait";var x=s(71786),v=s(82366),S=s(77367);const C="MOBILE";class k extends n.Component{constructor(e){super(e),this.handleExit=()=>{const{logger:e}=this.context;x.ZP.isAvailable()&&x.ZP.set(this.props.localStorageKey,"1"),this.props.thirdPartyUrl&&(0,S.f2)(e)(C)},this.handleContinueToJobClick=()=>{const{logger:e}=this.context;x.ZP.isAvailable()&&x.ZP.set(this.props.localStorageKey,"1"),(0,S.gQ)(e)(this.props.loggingPrefix)},this.handleRedirectToThirdPartySite=()=>{const{logger:e}=this.context;(0,S.fq)(e)(C)},this.handleWindowResized=()=>{const e=this.state.isSafariForIOS&&400===window.innerWidth,t=E();this.setState({hideIMG:e,screenOrientation:t})};const t=!(x.ZP.isAvailable()&&"1"===x.ZP.get(this.props.localStorageKey));this.state={isOpen:t,hideIMG:!1,isSafariForIOS:!1,screenOrientation:E()},this.statusMsgRef=n.createRef()}componentDidMount(){const{isSafariForIOS:e}=this.context.initialData;if(this.state.isOpen){const{logger:e}=this.context;(0,S.O9)(e)(this.props.loggingPrefix)}this.setState({isSafariForIOS:e}),window.addEventListener("resize",this.handleWindowResized),this.statusMsgRef&&this.statusMsgRef.current&&this.statusMsgRef.current.focus()}componentWillUnmount(){window.removeEventListener("resize",this.handleWindowResized)}render(){if(!this.state.isOpen)return null;const e="landscape"===this.state.screenOrientation&&this.state.hideIMG,t=f()({"jobsearch-SuccessfullySignedInModal-title":!0,"jobsearch-SuccessfullySignedInModal-title--mobile":e}),s="JP"===this.props.country,b=s?h:m,y=s?p:u,E=s?d:g,x=s?r.Z:c.Z;return n.createElement("div",{className:"jobsearch-SuccessfullySignedInModal","data-testid":"successfullySignedInModal"},n.createElement(l.M,null,n.createElement(o.default,{title:n.createElement("img",{src:x,className:"icl-Logo--wordmark--md",alt:"Indeed"}),closeAriaLabel:this.props.closeAriaText,isOpen:this.state.isOpen,onExit:this.handleExit,id:"jobsearch-SuccessfullySignedInModal"},n.createElement("div",{className:"jobsearch-SuccessfullySignedInModal-image"},e?"":n.createElement("img",{src:b,srcSet:`${b},\n                                            ${y} 2x,\n                                            ${E} 3x`,alt:""})),n.createElement("h1",{className:t,ref:this.statusMsgRef,tabIndex:0},this.props.titleText),n.createElement("div",{className:"jobsearch-SuccessfullySignedInModal-text"},this.props.successfulSigninText),this.props.thirdPartyUrl?n.createElement(v.Z,{url:this.props.thirdPartyUrl,onClick:this.handleRedirectToThirdPartySite,viewJobDisplay:this.props.viewJobDisplay},this.props.continueButtonText):n.createElement(a.default,{size:"lg",isBlock:!0,onClick:this.handleContinueToJobClick,className:"jobsearch-SuccessfullySignedInModal-continueToJobDescription"},this.props.continueButtonText,n.createElement(i.default,{title:"forward",type:"arrow-forward",color:"white",size:"md",position:"right"})))))}}k.contextType=y.Z;const w=k;var T=Object.defineProperty,A=Object.defineProperties,I=Object.getOwnPropertyDescriptors,O=Object.getOwnPropertySymbols,N=Object.prototype.hasOwnProperty,$=Object.prototype.propertyIsEnumerable,M=(e,t,s)=>t in e?T(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;const P=({successfullySignedInModel:e,mobtk:t,viewJobButtonLinkContainerModel:s,viewJobDisplay:a})=>{if(!e)return null;const i=s?`${s.viewJobButtonLinkModel.href}&log=2`:null,o=e.fromThirdPartyApply?"mobileThirdPartyApplySuccessfullySignedInModalShown":"mobileSuccessfullySignedInModalShown";return n.createElement(w,(l=((e,t)=>{for(var s in t||(t={}))N.call(t,s)&&M(e,s,t[s]);if(O)for(var s of O(t))$.call(t,s)&&M(e,s,t[s]);return e})({},e),A(l,I({mobtk:t,localStorageKey:o,loggingPrefix:"MOBILE_SUCCESSFUL_SIGNIN",thirdPartyUrl:i,viewJobDisplay:a}))));var l}}}]);