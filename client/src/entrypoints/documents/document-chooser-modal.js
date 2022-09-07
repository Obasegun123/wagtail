import $ from 'jquery';
import { ChooserModalOnloadHandlerFactory } from '../../includes/chooserModal';

class DocumentChooserModalOnloadHandlerFactory extends ChooserModalOnloadHandlerFactory {
  ajaxifyLinks(modal, context) {
    super.ajaxifyLinks(modal, context);

    $('a.upload-one-now').on('click', (event) => {
      // Set current collection ID at upload form tab
      const collectionId = $('#collection_chooser_collection_id').val();
      if (collectionId) {
        $('#id_document-chooser-upload-collection').val(collectionId);
      }

      event.preventDefault();
    });
  }
}

<<<<<<< HEAD
window.DOCUMENT_CHOOSER_MODAL_ONLOAD_HANDLERS =
  new DocumentChooserModalOnloadHandlerFactory({
    searchFilterSelectors: ['#collection_chooser_collection_id'],
    searchInputDelay: 50,
    chosenResponseName: 'documentChosen',
    creationFormSelector: 'form.document-upload',
    creationFormTabSelector: '#tab-upload',
    creationFormFileFieldSelector: '#id_document-chooser-upload-file',
    creationFormTitleFieldSelector: '#id_document-chooser-upload-title',
    creationFormEventName: 'wagtail:documents-upload',
  }).getOnLoadHandlers();
=======
window.DOCUMENT_CHOOSER_MODAL_ONLOAD_HANDLERS = {
  chooser: function (modal, jsonData) {
    function ajaxifyLinks(context) {
      $('a.document-choice', context).on('click', function () {
        modal.loadUrl(this.href);
        return false;
      });

      $('.pagination a', context).on('click', function () {
        loadResults(this.href);
        return false;
      });

      $('a.upload-one-now').on('click', function (e) {
        // Set current collection ID at upload form tab
        const collectionId = $('#collection_chooser_collection_id').val();
        if (collectionId) {
          $('#id_document-chooser-upload-collection').val(collectionId);
        }

        e.preventDefault();
      });

      // Reinitialize tabs to hook up tab event listeners in the modal
      initTabs();
    }

    var searchForm = $('form.document-search', modal.body);
    var searchUrl = searchForm.attr('action');
    var request;
    function search() {
      loadResults(searchUrl, searchForm.serialize());
      return false;
    }

    function loadResults(url, data) {
      var opts = {
        url: url,
        success: function (resultsData, status) {
          request = null;
          $('#search-results').html(resultsData);
          ajaxifyLinks($('#search-results'));
        },
        error: function () {
          request = null;
        },
      };
      if (data) {
        opts.data = data;
      }
      request = $.ajax(opts);
    }

    ajaxifyLinks(modal.body);
    ajaxifyDocumentUploadForm(modal);

    $('form.document-search', modal.body).on('submit', search);

    $('#id_q').on('input', function () {
      if (request) {
        request.abort();
      }
      clearTimeout($.data(this, 'timer'));
      var wait = setTimeout(search, 50);
      $(this).data('timer', wait);
    });

    $('#collection_chooser_collection_id').on('change', search);
  },
  document_chosen: function (modal, jsonData) {
    modal.respond('documentChosen', jsonData.result);
    modal.close();
  },
  reshow_upload_form: function (modal, jsonData) {
    $('#tab-upload', modal.body).replaceWith(jsonData.htmlFragment);
    initTabs();
    ajaxifyDocumentUploadForm(modal);
  },
};
>>>>>>> 24fdc703fd4a99074ed7524de76ba9b39b586845
