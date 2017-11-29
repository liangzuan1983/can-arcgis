define("can-arcgis@1.0.0#components/identify/util/identifyMapImage",["exports","esri-promise","can-util/js/get/get"],function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(e,t,n,r){return new Promise(function(o){(0,i.default)(["esri/tasks/support/IdentifyParameters","esri/tasks/IdentifyTask"]).then(function(i){var s=u(i,2),l=s[0],f=s[1],c=(0,a.default)(r,n.id+".include"),d=(0,a.default)(r,n.id+".exclude"),p=new l({layerIds:n.sublayers.filter(function(e){return(!c||!c.length||-1!==c.indexOf(e.id))&&!(d&&d.length&&d.indexOf(e.id)>-1)&&e.visible}).map(function(e){return e.id}),layerOption:"visible",returnGeometry:!0,spatialReference:e.mapPoint.spatialReference,tolerance:15,geometry:e.mapPoint,height:t.height,width:t.width,mapExtent:t.extent});new f({url:n.url}).execute(p).then(function(e){o(e)})})})};var i=r(t),a=r(n),u=function(){function e(e,t){var n=[],r=!0,i=!1,a=void 0;try{for(var u,o=e[Symbol.iterator]();!(r=(u=o.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(e){i=!0,a=e}finally{try{!r&&o.return&&o.return()}finally{if(i)throw a}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}()}),define("can-arcgis@1.0.0#components/identify/identify",["exports","can-define/map/map","./util/identifyMapImage","can-util/js/dev/dev","can-util/js/get/get","can-util/js/assign/assign","esri-promise","can-admin/util/string/string"],function(e,t,n,r,i,a,u,o){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0}),e.IDENTIFY_METHODS=void 0;var l=s(t),f=s(n),c=s(r),d=s(i),p=s(a),y=s(u),m=function(){function e(e,t){var n=[],r=!0,i=!1,a=void 0;try{for(var u,o=e[Symbol.iterator]();!(r=(u=o.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(e){i=!0,a=e}finally{try{!r&&o.return&&o.return()}finally{if(i)throw a}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),v=e.IDENTIFY_METHODS={"esri.layers.MapImageLayer":f.default},h=void 0;(0,y.default)(["esri/geometry/geometryEngine"]).then(function(e){var t=m(e,1)[0];h=t}),e.default=l.default.extend({clickHandle:"*",layerInfos:l.default,view:{type:"*",set:function(e){return this.clickHandle&&this.clickHandle.remove(),e&&(this.clickHandle=e.on("click",this.identify.bind(this))),e}},identify:function(e){var t=this;this.view.popup.features=[];var n=this.view.popup.promises.map(function(e){return new Promise(function(t){e.then(t)})});this.view.map.allLayers.forEach(function(r){if(r.visible)if(v.hasOwnProperty(r.declaredClass)){var i=v[r.declaredClass](e,t.view,r,t.layerInfos),a=new Promise(function(e){i.then(function(t){e({result:t,layerId:r.id})})});n.push(a)}else c.default.warn("no identify function registered for type "+r.declaredClass)}),setTimeout(function(){Promise.all(n).then(function(n){var r=n.reduce(function(e,n){return e.concat(t.assignPopupTemplate(n))},[]).sort(function(t,n){var r=[t,n].map(function(e){return e.geometry.extent?e.geometry.extent.center:e.geometry}),i=r.map(function(t,n){return h.distance(e.mapPoint,r[n],"feet")});return i[0]<i[1]?-1:i[0]>i[1]?1:0}),i=t.view.popup.features.concat(r);i.length&&t.view.popup.open({selectedFeatureIndex:0,features:i,updateLocationEnabled:!0})})})},assignPopupTemplate:function(e){var t=this,n=e.layerId,r=e.result;return r.results?r.results.map(function(e){var r=(0,d.default)(t,"popupTemplates."+n+"."+e.layerId)||{};return e.feature.popupTemplate=(0,p.default)({title:e.layerName,content:[{type:"fields",fieldInfos:Object.keys(e.feature.attributes).map(function(e){return{fieldName:e,label:(0,o.makeSentenceCase)(e),visible:!0}})}]},r.serialize?r.serialize():r),e.feature}):[]}})});
//# sourceMappingURL=group-map-image.js.map