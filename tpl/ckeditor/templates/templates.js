/*
Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.addTemplates('default',{imagesPath:CKEDITOR.getUrl('/tpl/ckeditor/templates/images/'),templates:[{
		title:'Bloc image',
	    image:'img-droite.gif',
	    description:'Bloc image à droite',
	    html:'<div class="img-wysiwyg"><img src="/tpl/img/img-default.png" alt=""><p>Légende</p></div><p></p>'
	},{	 
		title:'Bloc image droite',
	    image:'img-droite.gif',
	    description:'Bloc image à droite',
	    html:'<div class="img-wysiwyg-right"><img src="/tpl/img/img-default.png" alt=""><p>Légende</p></div><p></p>'
	},{	 
		title:'Bloc image gauche',
	    image:'img-gauche.gif',
	    description:'Bloc image à gauche',
	    html:'<div class="img-wysiwyg-left"><img src="/tpl/img/img-default.png" alt=""><p>Légende</p></div><p></p>'
	},{
		title:'Bloc image centré',
	    image:'img-centre.gif',
	    description:'Bloc image centré',
	    html:'<div class="img-wysiwyg-center"><img src="/tpl/img/img-default.png" alt=""><p>Légende</p></div><p></p>'
	}]});
