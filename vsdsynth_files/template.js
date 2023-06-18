if(typeof jQuery==='undefined'){throw new Error('template requires jQuery')}
+function($){'use strict'
var DataKey='Masteradmin.layout'
var Default={slimscroll:false,resetHeight:true}
var Selector={wrapper:'.wrapper',contentWrapper:'.content-wrapper',layoutBoxed:'.layout-boxed',mainFooter:'.main-footer',mainHeader:'.main-header',sidebar:'.sidebar',controlSidebar:'.control-sidebar',fixed:'.fixed',sidebarMenu:'.sidebar-menu',logo:'.main-header .logo'}
var ClassName={fixed:'fixed',holdTransition:'hold-transition'}
var Layout=function(options){this.options=options
this.bindedResize=false
this.activate()}
Layout.prototype.activate=function(){this.fix()
this.fixSidebar()
$('body').removeClass(ClassName.holdTransition)
if(this.options.resetHeight){$('body, html, '+Selector.wrapper).css({'height':'auto','min-height':'100%'})}
if(!this.bindedResize){$(window).resize(function(){this.fix()
this.fixSidebar()
$(Selector.logo+', '+Selector.sidebar).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){this.fix()
this.fixSidebar()}.bind(this))}.bind(this))
this.bindedResize=true}
$(Selector.sidebarMenu).on('expanded.tree',function(){this.fix()
this.fixSidebar()}.bind(this))
$(Selector.sidebarMenu).on('collapsed.tree',function(){this.fix()
this.fixSidebar()}.bind(this))}
Layout.prototype.fix=function(){$(Selector.layoutBoxed+' > '+Selector.wrapper).css('overflow','hidden')
var footerHeight=$(Selector.mainFooter).outerHeight()||0
var neg=$(Selector.mainHeader).outerHeight()+footerHeight
var windowHeight=$(window).height()
var sidebarHeight=$(Selector.sidebar).height()||0
if($('body').hasClass(ClassName.fixed)){$(Selector.contentWrapper).css('min-height',windowHeight-footerHeight)}else{var postSetHeight
if(windowHeight>=sidebarHeight){$(Selector.contentWrapper).css('min-height',windowHeight-neg)
postSetHeight=windowHeight-neg}else{$(Selector.contentWrapper).css('min-height',sidebarHeight)
postSetHeight=sidebarHeight}
var $controlSidebar=$(Selector.controlSidebar)
if(typeof $controlSidebar!=='undefined'){if($controlSidebar.height()>postSetHeight)
$(Selector.contentWrapper).css('min-height',$controlSidebar.height())}}}
Layout.prototype.fixSidebar=function(){if(!$('body').hasClass(ClassName.fixed)){if(typeof $.fn.slimScroll!=='undefined'){$(Selector.sidebar).slimScroll({destroy:true}).height('auto')}
return}
if(this.options.slimscroll){if(typeof $.fn.slimScroll!=='undefined'){$(Selector.sidebar).slimScroll({destroy:true}).height('auto')
$(Selector.sidebar).slimScroll({height:($(window).height()-$(Selector.mainHeader).height())+'px',color:'rgba(0,0,0,0.2)',size:'3px'})}}}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data(DataKey)
if(!data){var options=$.extend({},Default,$this.data(),typeof option==='object'&&option)
$this.data(DataKey,(data=new Layout(options)))}
if(typeof option=='string'){if(typeof data[option]=='undefined'){throw new Error('No method named '+option)}
data[option]()}})}
var old=$.fn.layout
$.fn.layout=Plugin
$.fn.layout.Constuctor=Layout
$.fn.layout.noConflict=function(){$.fn.layout=old
return this}
$(window).on('load',function(){Plugin.call($('body'))});}(jQuery)
+function($){'use strict'
var DataKey='Masteradmin.pushmenu'
var Default={collapseScreenSize:767,expandOnHover:false,expandTransitionDelay:200}
var Selector={collapsed:'.sidebar-collapse',open:'.sidebar-open',mainSidebar:'.main-sidebar',contentWrapper:'.content-wrapper',searchInput:'.sidebar-form .form-control',button:'[data-toggle="push-menu"]',mini:'.sidebar-mini',expanded:'',layoutFixed:'.fixed'}
var ClassName={collapsed:'sidebar-collapse',open:'sidebar-open',mini:'sidebar-mini',expanded:'',expandFeature:'',layoutFixed:'fixed'}
var Event={expanded:'expanded.pushMenu',collapsed:'collapsed.pushMenu'}
var PushMenu=function(options){this.options=options
this.init()}
PushMenu.prototype.init=function(){$(Selector.contentWrapper).on(function(){if($(window).width()<=this.options.collapseScreenSize&&$('body').hasClass(ClassName.open)){this.close()}}.bind(this))
$(Selector.searchInput).on(function(e){e.stopPropagation()})}
PushMenu.prototype.toggle=function(){var windowWidth=$(window).width()
var isOpen=!$('body').hasClass(ClassName.collapsed)
if(windowWidth<=this.options.collapseScreenSize){isOpen=$('body').hasClass(ClassName.open)}
if(!isOpen){this.open()}else{this.close()}}
PushMenu.prototype.open=function(){var windowWidth=$(window).width()
if(windowWidth>this.options.collapseScreenSize){$('body').removeClass(ClassName.collapsed).trigger($.Event(Event.expanded))}
else{$('body').addClass(ClassName.open).trigger($.Event(Event.expanded))}}
PushMenu.prototype.close=function(){var windowWidth=$(window).width()
if(windowWidth>this.options.collapseScreenSize){$('body').addClass(ClassName.collapsed).trigger($.Event(Event.collapsed))}else{$('body').removeClass(ClassName.open+' '+ClassName.collapsed).trigger($.Event(Event.collapsed))}}
PushMenu.prototype.expandOnHover=function(){$(Selector.mainSidebar).hover(function(){if($('body').is(Selector.mini+Selector.collapsed)&&$(window).width()>this.options.collapseScreenSize){this.expand()}}.bind(this),function(){if($('body').is(Selector.expanded)){this.collapse()}}.bind(this))}
PushMenu.prototype.collapse=function(){setTimeout(function(){$('body').removeClass(ClassName.expanded).addClass(ClassName.collapsed)},this.options.expandTransitionDelay)}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data(DataKey)
if(!data){var options=$.extend({},Default,$this.data(),typeof option==='object'&&option)
$this.data(DataKey,(data=new PushMenu(options)))}
if(option=='toggle')data.toggle()})}
var old=$.fn.pushMenu
$.fn.pushMenu=Plugin
$.fn.pushMenu.Constructor=PushMenu
$.fn.pushMenu.noConflict=function(){$.fn.pushMenu=old
return this}
$(document).on('click',Selector.button,function(e){e.preventDefault()
Plugin.call($(this),'toggle')})
$(window).on('load',function(){Plugin.call($(Selector.button))})}(jQuery)
+function($){'use strict'
var DataKey='Masteradmin.tree'
var Default={animationSpeed:500,accordion:true,followLink:false,trigger:'.treeview a'}
var Selector={tree:'.tree',treeview:'.treeview',treeviewMenu:'.treeview-menu',open:'.menu-open, .active',li:'li',data:'[data-widget="tree"]',active:'.active'}
var ClassName={open:'menu-open',tree:'tree'}
var Event={collapsed:'collapsed.tree',expanded:'expanded.tree'}
var Tree=function(element,options){this.element=element
this.options=options
$(this.element).addClass(ClassName.tree)
$(Selector.treeview+Selector.active,this.element).addClass(ClassName.open)
this._setUpListeners()}
Tree.prototype.toggle=function(link,event){var treeviewMenu=link.next(Selector.treeviewMenu)
var parentLi=link.parent()
var isOpen=parentLi.hasClass(ClassName.open)
if(!parentLi.is(Selector.treeview)){return}
if(!this.options.followLink||link.attr('href')=='#'){event.preventDefault()}
if(isOpen){this.collapse(treeviewMenu,parentLi)}else{this.expand(treeviewMenu,parentLi)}}
Tree.prototype.expand=function(tree,parent){var expandedEvent=$.Event(Event.expanded)
if(this.options.accordion){var openMenuLi=parent.siblings(Selector.open)
var openTree=openMenuLi.children(Selector.treeviewMenu)
this.collapse(openTree,openMenuLi)}
parent.addClass(ClassName.open)
tree.slideDown(this.options.animationSpeed,function(){$(this.element).trigger(expandedEvent)}.bind(this))}
Tree.prototype.collapse=function(tree,parentLi){var collapsedEvent=$.Event(Event.collapsed)
tree.find(Selector.open).removeClass(ClassName.open)
parentLi.removeClass(ClassName.open)
tree.slideUp(this.options.animationSpeed,function(){tree.find(Selector.open+' > '+Selector.treeview).slideUp()
$(this.element).trigger(collapsedEvent)}.bind(this))}
Tree.prototype._setUpListeners=function(){var that=this
$(this.element).on('click',this.options.trigger,function(event){that.toggle($(this),event)})}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data(DataKey)
if(!data){var options=$.extend({},Default,$this.data(),typeof option==='object'&&option)
$this.data(DataKey,new Tree($this,options))}})}
var old=$.fn.tree
$.fn.tree=Plugin
$.fn.tree.Constructor=Tree
$.fn.tree.noConflict=function(){$.fn.tree=old
return this}
$(window).on('load',function(){$(Selector.data).each(function(){Plugin.call($(this))})})}(jQuery)
+function($){'use strict'
var DataKey='Masteradmin.controlsidebar'
var Default={slide:true}
var Selector={sidebar:'.control-sidebar',data:'[data-toggle="control-sidebar"]',open:'.control-sidebar-open',bg:'.control-sidebar-bg',wrapper:'.wrapper',content:'.content-wrapper',boxed:'.layout-boxed'}
var ClassName={open:'control-sidebar-open',fixed:'fixed'}
var Event={collapsed:'collapsed.controlsidebar',expanded:'expanded.controlsidebar'}
var ControlSidebar=function(element,options){this.element=element
this.options=options
this.hasBindedResize=false
this.init()}
ControlSidebar.prototype.init=function(){if(!$(this.element).is(Selector.data)){$(this).on('click',this.toggle)}
this.fix()
$(window).resize(function(){this.fix()}.bind(this))}
ControlSidebar.prototype.toggle=function(event){if(event)event.preventDefault()
this.fix()
if(!$(Selector.sidebar).is(Selector.open)&&!$('body').is(Selector.open)){this.expand()}else{this.collapse()}}
ControlSidebar.prototype.expand=function(){if(!this.options.slide){$('body').addClass(ClassName.open)}else{$(Selector.sidebar).addClass(ClassName.open)}
$(this.element).trigger($.Event(Event.expanded))}
ControlSidebar.prototype.collapse=function(){$('body, '+Selector.sidebar).removeClass(ClassName.open)
$(this.element).trigger($.Event(Event.collapsed))}
ControlSidebar.prototype.fix=function(){if($('body').is(Selector.boxed)){this._fixForBoxed($(Selector.bg))}}
ControlSidebar.prototype._fixForBoxed=function(bg){bg.css({position:'absolute',height:$(Selector.wrapper).height()})}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data(DataKey)
if(!data){var options=$.extend({},Default,$this.data(),typeof option==='object'&&option)
$this.data(DataKey,(data=new ControlSidebar($this,options)))}
if(typeof option=='string')data.toggle()})}
var old=$.fn.controlSidebar
$.fn.controlSidebar=Plugin
$.fn.controlSidebar.Constructor=ControlSidebar
$.fn.controlSidebar.noConflict=function(){$.fn.controlSidebar=old
return this}
$(document).on('click',Selector.data,function(event){if(event)event.preventDefault()
Plugin.call($(this),'toggle')})}(jQuery)
+function($){'use strict'
var DataKey='Masteradmin.boxwidget'
var Default={animationSpeed:500,collapseTrigger:'[data-widget="collapse"]',removeTrigger:'[data-widget="remove"]',collapseIcon:'fa-minus',expandIcon:'fa-plus',removeIcon:'fa-times'}
var Selector={data:'.box',collapsed:'.collapsed-box',body:'.box-body',footer:'.box-footer',tools:'.box-tools'}
var ClassName={collapsed:'collapsed-box'}
var Event={collapsed:'collapsed.boxwidget',expanded:'expanded.boxwidget',removed:'removed.boxwidget'}
var BoxWidget=function(element,options){this.element=element
this.options=options
this._setUpListeners()}
BoxWidget.prototype.toggle=function(){var isOpen=!$(this.element).is(Selector.collapsed)
if(isOpen){this.collapse()}else{this.expand()}}
BoxWidget.prototype.expand=function(){var expandedEvent=$.Event(Event.expanded)
var collapseIcon=this.options.collapseIcon
var expandIcon=this.options.expandIcon
$(this.element).removeClass(ClassName.collapsed)
$(this.element).find(Selector.tools).find('.'+expandIcon).removeClass(expandIcon).addClass(collapseIcon)
$(this.element).find(Selector.body+', '+Selector.footer).slideDown(this.options.animationSpeed,function(){$(this.element).trigger(expandedEvent)}.bind(this))}
BoxWidget.prototype.collapse=function(){var collapsedEvent=$.Event(Event.collapsed)
var collapseIcon=this.options.collapseIcon
var expandIcon=this.options.expandIcon
$(this.element).find(Selector.tools).find('.'+collapseIcon).removeClass(collapseIcon).addClass(expandIcon)
$(this.element).find(Selector.body+', '+Selector.footer).slideUp(this.options.animationSpeed,function(){$(this.element).addClass(ClassName.collapsed)
$(this.element).trigger(collapsedEvent)}.bind(this))}
BoxWidget.prototype.remove=function(){var removedEvent=$.Event(Event.removed)
$(this.element).slideUp(this.options.animationSpeed,function(){$(this.element).trigger(removedEvent)
$(this.element).remove()}.bind(this))}
BoxWidget.prototype._setUpListeners=function(){var that=this
$(this.element).on('click',this.options.collapseTrigger,function(event){if(event)event.preventDefault()
that.toggle()})
$(this.element).on('click',this.options.removeTrigger,function(event){if(event)event.preventDefault()
that.remove()})}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data(DataKey)
if(!data){var options=$.extend({},Default,$this.data(),typeof option==='object'&&option)
$this.data(DataKey,(data=new BoxWidget($this,options)))}
if(typeof option=='string'){if(typeof data[option]=='undefined'){throw new Error('No method named '+option)}
data[option]()}})}
var old=$.fn.boxWidget
$.fn.boxWidget=Plugin
$.fn.boxWidget.Constructor=BoxWidget
$.fn.boxWidget.noConflict=function(){$.fn.boxWidget=old
return this}
$(window).on('load',function(){$(Selector.data).each(function(){Plugin.call($(this))})})}(jQuery)
+function($){'use strict'
var DataKey='Masteradmin.todolist'
var Default={iCheck:false,onCheck:function(){},onUnCheck:function(){}}
var Selector={data:'[data-widget="todo-list"]'}
var ClassName={done:'done'}
var TodoList=function(element,options){this.element=element
this.options=options
this._setUpListeners()}
TodoList.prototype.toggle=function(item){item.parents(Selector.li).first().toggleClass(ClassName.done)
if(!item.prop('checked')){this.unCheck(item)
return}
this.check(item)}
TodoList.prototype.check=function(item){this.options.onCheck.call(item)}
TodoList.prototype.unCheck=function(item){this.options.onUnCheck.call(item)}
TodoList.prototype._setUpListeners=function(){var that=this
$(this.element).on('change ifChanged','input:checkbox',function(){that.toggle($(this))})}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data(DataKey)
if(!data){var options=$.extend({},Default,$this.data(),typeof option==='object'&&option)
$this.data(DataKey,(data=new TodoList($this,options)))}
if(typeof data=='string'){if(typeof data[option]=='undefined'){throw new Error('No method named '+option)}
data[option]()}})}
var old=$.fn.todoList
$.fn.todoList=Plugin
$.fn.todoList.Constructor=TodoList
$.fn.todoList.noConflict=function(){$.fn.todoList=old
return this}
$(window).on('load',function(){$(Selector.data).each(function(){Plugin.call($(this))})})}(jQuery)
+function($){'use strict'
var DataKey='Masteradmin.directchat'
var Selector={data:'[data-widget="chat-pane-toggle"]',box:'.direct-chat'}
var ClassName={open:'direct-chat-contacts-open'}
var DirectChat=function(element){this.element=element}
DirectChat.prototype.toggle=function($trigger){$trigger.parents(Selector.box).first().toggleClass(ClassName.open)}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data(DataKey)
if(!data){$this.data(DataKey,(data=new DirectChat($this)))}
if(typeof option=='string')data.toggle($this)})}
var old=$.fn.directChat
$.fn.directChat=Plugin
$.fn.directChat.Constructor=DirectChat
$.fn.directChat.noConflict=function(){$.fn.directChat=old
return this}
$(document).on('click',Selector.data,function(event){if(event)event.preventDefault()
Plugin.call($(this),'toggle')})
$('.inner-content-div').slimScroll({height:'200'});$('.sm-scrol').slimScroll({height:'250'});$('.direct-chat-messages').slimScroll({height:'420'});$('.chat-box-one').slimScroll({height:'550'});$('.chat-box-one2').slimScroll({height:'580'});$('.chat-box-one-side').slimScroll({height:'650'});$('.chat-box-one-side2').slimScroll({height:'500'});$('.chat-box-one-side3').slimScroll({height:'685'});$('.notification-side').slimScroll({height:'325'});$('.suggestions-side').slimScroll({height:'300'});$('.events-side').slimScroll({height:'265'});$('.pat-div').slimScroll({height:'204'});$('.demo-panel-bx').slimScroll({height:'auto'});$(".search-box a, .search-box .app-search .srh-btn").on('click',function(){$(".app-search").toggle(200);});$(document).on('click','.box-btn-close',function(){$(this).parents('.box').fadeOut(600,function(){if($(this).parent().children().length==1){$(this).parent().remove();}
else{$(this).remove();}});});$(document).on('click','.box-btn-slide',function(){$(this).toggleClass('rotate-180').parents('.box').find('.box-content, .box-body').slideToggle();});$(document).on('click','.box-btn-maximize',function(){$(this).parents('.box').toggleClass('box-maximize').removeClass('box-fullscreen');});$(document).on('click','.box-btn-fullscreen',function(){$(this).parents('.box').toggleClass('box-fullscreen').removeClass('box-maximize');});$(document).on('click','a[href="#"]',function(e){e.preventDefault();});$(".open-left-block").on('click',function(){$('.left-block').toggleClass('open-panel');$('.open-left-block').toggleClass('mdi-menu');});$(document).on('click','.file-browser',function(){var $browser=$(this);if($browser.hasClass('form-control')){setTimeout(function(){$browser.closest('.file-group').find('[type="file"]').trigger('click');},300);}
else{var file=$browser.closest('.file-group').find('[type="file"]');file.on('click',function(e){e.stopPropagation();});file.trigger('click');}});$(document).on('change','.file-group [type="file"]',function(){var input=$(this)[0];var len=input.files.length;var filename='';for(var i=0;i<len;++i){filename+=input.files.item(i).name+', ';}
filename=filename.substr(0,filename.length-2);$(this).closest('.file-group').find('.file-value').val(filename).text(filename).focus();});$(document).on('change','.custom-file-input',function(){var filename=$(this).val().split('\\').pop();$(this).next('.custom-file-control').attr('data-input-value',filename);});$('.custom-file-control:not([data-input-value])').attr('data-input-value','Choose file...');$('.todo-list').todoList({onCheck:function(){window.console.log($(this),'The element has been checked');},onUnCheck:function(){window.console.log($(this),'The element has been unchecked');}});$('#thismonth').sparkline([8,5,4,7,9,7,10,9],{type:'bar',height:'35',barWidth:'4',resize:true,barSpacing:'4',barColor:'#843cf7'});$('#lastyear').sparkline([8,5,4,7,9,7,10,9],{type:'bar',height:'35',barWidth:'4',resize:true,barSpacing:'4',barColor:'#ec4b71'});var sparkResize;$("#chat-circle, #chat-box-toggle, #chat-popup").click(function(){$("#chat-box-body").toggleClass("show");});}(jQuery)
$(function(){'use strict'
$('[data-provide~="fullscreen"]').on('click',function(){screenfull.toggle($('#container')[0]);});});+function($){'use strict'
var path=window.location.pathname.split("/").pop();var target=$('.sidebar-menu li a[href="'+path+'"]');target.parent().addClass('active');$('.sidebar-menu li.active').parents('li').addClass('active');}(jQuery)
+function($){'use strict'
var path=window.location.pathname.split("/").pop();var target=$('.sm li a[href="'+path+'"]');target.parent().addClass('current');$('.sm li.current').parents('li').addClass('current');}(jQuery)
$(function(){'use strict'
feather.replace();});/*!
* Waves v0.6.4
* http://fian.my.id/Waves
*
* Copyright 2014 Alfiana E. Sibuea and other contributors
* Released under the MIT license
* https://github.com/fians/Waves/blob/master/LICENSE
*/;(function(window){'use strict';var Waves=Waves||{};var $$=document.querySelectorAll.bind(document);function isWindow(obj){return obj!==null&&obj===obj.window;}
function getWindow(elem){return isWindow(elem)?elem:elem.nodeType===9&&elem.defaultView;}
function offset(elem){var docElem,win,box={top:0,left:0},doc=elem&&elem.ownerDocument;docElem=doc.documentElement;if(typeof elem.getBoundingClientRect!==typeof undefined){box=elem.getBoundingClientRect();}
win=getWindow(doc);return{top:box.top+win.pageYOffset-docElem.clientTop,left:box.left+win.pageXOffset-docElem.clientLeft};}
function convertStyle(obj){var style='';for(var a in obj){if(obj.hasOwnProperty(a)){style+=(a+':'+obj[a]+';');}}
return style;}
var Effect={duration:750,show:function(e,element){if(e.button===2){return false;}
var el=element||this;var ripple=document.createElement('div');ripple.className='waves-ripple';el.appendChild(ripple);var pos=offset(el);var relativeY=(e.pageY-pos.top);var relativeX=(e.pageX-pos.left);var scale='scale('+((el.clientWidth/100)*10)+')';if('touches'in e){relativeY=(e.touches[0].pageY-pos.top);relativeX=(e.touches[0].pageX-pos.left);}
ripple.setAttribute('data-hold',Date.now());ripple.setAttribute('data-scale',scale);ripple.setAttribute('data-x',relativeX);ripple.setAttribute('data-y',relativeY);var rippleStyle={'top':relativeY+'px','left':relativeX+'px'};ripple.className=ripple.className+' waves-notransition';ripple.setAttribute('style',convertStyle(rippleStyle));ripple.className=ripple.className.replace('waves-notransition','');rippleStyle['-webkit-transform']=scale;rippleStyle['-moz-transform']=scale;rippleStyle['-ms-transform']=scale;rippleStyle['-o-transform']=scale;rippleStyle.transform=scale;rippleStyle.opacity='1';rippleStyle['-webkit-transition-duration']=Effect.duration+'ms';rippleStyle['-moz-transition-duration']=Effect.duration+'ms';rippleStyle['-o-transition-duration']=Effect.duration+'ms';rippleStyle['transition-duration']=Effect.duration+'ms';rippleStyle['-webkit-transition-timing-function']='cubic-bezier(0.250, 0.460, 0.450, 0.940)';rippleStyle['-moz-transition-timing-function']='cubic-bezier(0.250, 0.460, 0.450, 0.940)';rippleStyle['-o-transition-timing-function']='cubic-bezier(0.250, 0.460, 0.450, 0.940)';rippleStyle['transition-timing-function']='cubic-bezier(0.250, 0.460, 0.450, 0.940)';ripple.setAttribute('style',convertStyle(rippleStyle));},hide:function(e){TouchHandler.touchup(e);var el=this;var width=el.clientWidth*1.4;var ripple=null;var ripples=el.getElementsByClassName('waves-ripple');if(ripples.length>0){ripple=ripples[ripples.length-1];}else{return false;}
var relativeX=ripple.getAttribute('data-x');var relativeY=ripple.getAttribute('data-y');var scale=ripple.getAttribute('data-scale');var diff=Date.now()-Number(ripple.getAttribute('data-hold'));var delay=350-diff;if(delay<0){delay=0;}
setTimeout(function(){var style={'top':relativeY+'px','left':relativeX+'px','opacity':'0','-webkit-transition-duration':Effect.duration+'ms','-moz-transition-duration':Effect.duration+'ms','-o-transition-duration':Effect.duration+'ms','transition-duration':Effect.duration+'ms','-webkit-transform':scale,'-moz-transform':scale,'-ms-transform':scale,'-o-transform':scale,'transform':scale,};ripple.setAttribute('style',convertStyle(style));setTimeout(function(){try{el.removeChild(ripple);}catch(e){return false;}},Effect.duration);},delay);},wrapInput:function(elements){for(var a=0;a<elements.length;a++){var el=elements[a];if(el.tagName.toLowerCase()==='input'){var parent=el.parentNode;if(parent.tagName.toLowerCase()==='i'&&parent.className.indexOf('waves-effect')!==-1){continue;}
var wrapper=document.createElement('i');wrapper.className=el.className+' waves-input-wrapper';var elementStyle=el.getAttribute('style');if(!elementStyle){elementStyle='';}
wrapper.setAttribute('style',elementStyle);el.className='waves-button-input';el.removeAttribute('style');parent.replaceChild(wrapper,el);wrapper.appendChild(el);}}}};var TouchHandler={touches:0,allowEvent:function(e){var allow=true;if(e.type==='touchstart'){TouchHandler.touches+=1;}else if(e.type==='touchend'||e.type==='touchcancel'){setTimeout(function(){if(TouchHandler.touches>0){TouchHandler.touches-=1;}},500);}else if(e.type==='mousedown'&&TouchHandler.touches>0){allow=false;}
return allow;},touchup:function(e){TouchHandler.allowEvent(e);}};function getWavesEffectElement(e){if(TouchHandler.allowEvent(e)===false){return null;}
var element=null;var target=e.target||e.srcElement;while(target.parentNode!==null){if(!(target instanceof SVGElement)&&target.className.indexOf('waves-effect')!==-1){element=target;break;}
target=target.parentNode;}
return element;}
function showEffect(e){var element=getWavesEffectElement(e);if(element!==null){Effect.show(e,element);if('ontouchstart'in window){element.addEventListener('touchend',Effect.hide,false);element.addEventListener('touchcancel',Effect.hide,false);}
element.addEventListener('mouseup',Effect.hide,false);element.addEventListener('mouseleave',Effect.hide,false);element.addEventListener('dragend',Effect.hide,false);}}
Waves.displayEffect=function(options){options=options||{};if('duration'in options){Effect.duration=options.duration;}
Effect.wrapInput($$('.waves-effect'));if('ontouchstart'in window){document.body.addEventListener('touchstart',showEffect,false);}
document.body.addEventListener('mousedown',showEffect,false);};Waves.attach=function(element){if(element.tagName.toLowerCase()==='input'){Effect.wrapInput([element]);element=element.parentNode;}
if('ontouchstart'in window){element.addEventListener('touchstart',showEffect,false);}
element.addEventListener('mousedown',showEffect,false);};window.Waves=Waves;document.addEventListener('DOMContentLoaded',function(){Waves.displayEffect();},false);})(window);$(function(){$('[data-toggle="tooltip"]').tooltip({trigger:'hover'})});function w3_open(){document.getElementById("mySidebar").style.display="block";document.getElementById("myOverlay").style.display="block";}
function w3_close(){document.getElementById("mySidebar").style.display="none";document.getElementById("myOverlay").style.display="none";}
var loader;function loadNow(opacity){if(opacity<=0.7)
{displayContent();}
else
{loader.style.opacity=opacity;window.setTimeout(function(){loadNow(opacity-0.05);},50);}}
function displayContent(){loader.style.display='none';}
document.addEventListener("DOMContentLoaded",function(){loader=document.getElementById('loader');loadNow(1);});new PerfectScrollbar(".multinav-scroll");