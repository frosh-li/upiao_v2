/*! FixedHeader 3.1.0
 * ©2009-2015 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     FixedHeader
 * @description Fix a table's header or footer, so it is always visible while
 *              scrolling
 * @version     3.1.0
 * @file        dataTables.fixedHeader.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2009-2015 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

(function(e){typeof define=="function"&&define.amd?define(["jquery","table"],function(t){return e(t,window,document)}):typeof exports=="object"?module.exports=function(t,n){t||(t=window);if(!n||!n.fn.dataTable)n=require("table")(t,n).$;return e(n,t,t.document)}:e(jQuery,window,document)})(function(e,t,n,r){var i=e.fn.dataTable,s=0,o=function(n,r){if(!(this instanceof o))throw"FixedHeader must be initialised with the 'new' keyword.";r===!0&&(r={}),n=new i.Api(n),this.c=e.extend(!0,{},o.defaults,r),this.s={dt:n,position:{theadTop:0,tbodyTop:0,tfootTop:0,tfootBottom:0,width:0,left:0,tfootHeight:0,theadHeight:0,windowHeight:e(t).height(),visible:!0},headerMode:null,footerMode:null,autoWidth:n.settings()[0].oFeatures.bAutoWidth,namespace:".dtfc"+s++,scrollLeft:{header:-1,footer:-1},enable:!0},this.dom={floatingHeader:null,thead:e(n.table().header()),tbody:e(n.table().body()),tfoot:e(n.table().footer()),header:{host:null,floating:null,placeholder:null},footer:{host:null,floating:null,placeholder:null}},this.dom.header.host=this.dom.thead.parent(),this.dom.footer.host=this.dom.tfoot.parent();var u=n.settings()[0];if(u._fixedHeader)throw"FixedHeader already initialised on table "+u.nTable.id;u._fixedHeader=this,this._constructor()};return e.extend(o.prototype,{enable:function(e){this.s.enable=e,this.c.header&&this._modeChange("in-place","header",!0),this.c.footer&&this.dom.tfoot.length&&this._modeChange("in-place","footer",!0),this.update()},headerOffset:function(e){return e!==r&&(this.c.headerOffset=e,this.update()),this.c.headerOffset},footerOffset:function(e){return e!==r&&(this.c.footerOffset=e,this.update()),this.c.footerOffset},update:function(){this._positions(),this._scroll(!0)},_constructor:function(){var n=this,r=this.s.dt;e(t).on("scroll"+this.s.namespace,function(){n._scroll()}).on("resize"+this.s.namespace,function(){n.s.position.windowHeight=e(t).height(),n.update()}),r.on("column-reorder.dt.dtfc column-visibility.dt.dtfc draw.dt.dtfc",function(){n.update()}),r.on("destroy.dtfc",function(){r.off(".dtfc"),e(t).off(n.s.namespace)}),this._positions(),this._scroll()},_clone:function(t,n){var r=this.s.dt,i=this.dom[t],s=t==="header"?this.dom.thead:this.dom.tfoot;!n&&i.floating?i.floating.removeClass("fixedHeader-floating fixedHeader-locked"):(i.floating&&(i.placeholder.remove(),i.floating.children().detach(),i.floating.remove()),i.floating=e(r.table().node().cloneNode(!1)).removeAttr("id").append(s).appendTo("body"),i.placeholder=s.clone(!1),i.host.append(i.placeholder),this._matchWidths(i.placeholder,i.floating))},_matchWidths:function(t,n){var r=function(r){var i=e(r,t).map(function(){return e(this).width()}).toArray();e(r,n).each(function(t){e(this).width(i[t]).css("min-width",i[t])})};r("th"),r("td")},_unsize:function(t){var n=this.dom[t].floating;n&&(t==="footer"||t==="header"&&!this.s.autoWidth)&&e("th, td",n).css("width","")},_horizontal:function(e,t){var n=this.dom[e],r=this.s.position,i=this.s.scrollLeft;n.floating&&i[e]!==t&&(n.floating.css("left",r.left-t),i[e]=t)},_modeChange:function(e,t,n){var r=this.s.dt,i=this.dom[t],s=this.s.position;e==="in-place"?(i.placeholder&&(i.placeholder.remove(),i.placeholder=null),this._unsize(t),i.host.append(t==="header"?this.dom.thead:this.dom.tfoot),i.floating&&(i.floating.remove(),i.floating=null)):e==="in"?(this._clone(t,n),i.floating.addClass("fixedHeader-floating").css(t==="header"?"top":"bottom",this.c[t+"Offset"]).css("left",s.left+"px").css("width",s.width+"px"),t==="footer"&&i.floating.css("top","")):e==="below"?(this._clone(t,n),i.floating.addClass("fixedHeader-locked").css("top",s.tfootTop-s.theadHeight).css("left",s.left+"px").css("width",s.width+"px")):e==="above"&&(this._clone(t,n),i.floating.addClass("fixedHeader-locked").css("top",s.tbodyTop).css("left",s.left+"px").css("width",s.width+"px")),this.s.scrollLeft.header=-1,this.s.scrollLeft.footer=-1,this.s[t+"Mode"]=e},_positions:function(){var t=this.s.dt,n=t.table(),r=this.s.position,i=this.dom,s=e(n.node()),o=s.children("thead"),u=s.children("tfoot"),a=i.tbody;r.visible=s.is(":visible"),r.width=s.outerWidth(),r.left=s.offset().left,r.theadTop=o.offset().top,r.tbodyTop=a.offset().top,r.theadHeight=r.tbodyTop-r.theadTop,u.length?(r.tfootTop=u.offset().top,r.tfootBottom=r.tfootTop+u.outerHeight(),r.tfootHeight=r.tfootBottom-r.tfootTop):(r.tfootTop=r.tbodyTop+a.outerHeight(),r.tfootBottom=r.tfootTop,r.tfootHeight=r.tfootTop)},_scroll:function(t){var r=e(n).scrollTop(),i=e(n).scrollLeft(),s=this.s.position,o,u;if(!this.s.enable)return;this.c.header&&(!s.visible||r<=s.theadTop-this.c.headerOffset?o="in-place":r<=s.tfootTop-s.theadHeight-this.c.headerOffset?o="in":o="below",(t||o!==this.s.headerMode)&&this._modeChange(o,"header",t),this._horizontal("header",i)),this.c.footer&&this.dom.tfoot.length&&(!s.visible||r+s.windowHeight>=s.tfootBottom+this.c.footerOffset?u="in-place":s.windowHeight+r>s.tbodyTop+s.tfootHeight+this.c.footerOffset?u="in":u="above",(t||u!==this.s.footerMode)&&this._modeChange(u,"footer",t),this._horizontal("footer",i))}}),o.version="3.1.0",o.defaults={header:!0,footer:!1,headerOffset:0,footerOffset:0},e.fn.dataTable.FixedHeader=o,e.fn.DataTable.FixedHeader=o,e(n).on("init.dt.dtb",function(e,t,n){if(e.namespace!=="dt")return;var r=t.oInit.fixedHeader||i.defaults.fixedHeader;r&&!t._fixedHeader&&new o(t,r)}),i.Api.register("fixedHeader()",function(){}),i.Api.register("fixedHeader.adjust()",function(){return this.iterator("table",function(e){var t=e._fixedHeader;t&&t.update()})}),i.Api.register("fixedHeader.enable()",function(e){return this.iterator("table",function(t){var n=t._fixedHeader;n&&n.enable(e!==r?e:!0)})}),i.Api.register("fixedHeader.disable()",function(){return this.iterator("table",function(e){var t=e._fixedHeader;t&&t.enable(!1)})}),e.each(["header","footer"],function(e,t){i.Api.register("fixedHeader."+t+"Offset()",function(e){var n=this.context;return e===r?n.length&&n[0]._fixedHeader?n[0]._fixedHeader[t+"Offset"]():r:this.iterator("table",function(n){var r=n._fixedHeader;r&&r[t+"Offset"](e)})})}),o});