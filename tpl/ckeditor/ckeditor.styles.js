/**
 * Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

// This file contains style definitions that can be used by CKEditor plugins.
//
// The most common use for it is the "stylescombo" plugin, which shows a combo
// in the editor toolbar, containing all styles. Other plugins instead, like
// the div plugin, use a subset of the styles on their feature.
//
// If you don't have plugins that depend on this file, you can simply ignore it.
// Otherwise it is strongly recommended to customize this file to match your
// website requirements and design properly.

CKEDITOR.stylesSet.add( 'default', [
	/* Block Styles */

	// These styles are already available in the "Format" drop-down list, so they are
	// not needed here by default. You may enable them to avoid placing the
	// "Format" drop-down list in the toolbar, maintaining the same features.

	{ name : 'Paragraphe'				, element : 'p' },
	{ name : 'Titre 2'					, element : 'h2' },
	{ name : 'Titre 3'					, element : 'h3' },
	{ name : 'Titre 4'					, element : 'h4' },
	{ name : 'Titre 5'					, element : 'h5' },
	
	{ name : 'Encadre'					, element : 'p', attributes : { 'class' : 'framed-wysiwyg' } },
	{ name : 'Lien'						, element : 'a', attributes : { 'class' : 'cta-wysiwyg' } },
	{ name : 'Mise en avant'			, element : 'span', attributes : { 'class' : 'highlight-wysiwyg' } },
	
	{ name : 'Bloc image entier'		, element : 'div', attributes : { 'class' : 'img-wysiwyg' } },
	{ name : 'Bloc image gauche'		, element : 'div', attributes : { 'class' : 'img-wysiwyg-left' } },
	{ name : 'Bloc image droite'		, element : 'div', attributes : { 'class' : 'img-wysiwyg-right' } },
	{ name : 'Bloc image centre'		, element : 'div', attributes : { 'class' : 'img-wysiwyg-center' } }
] );