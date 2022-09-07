import $ from 'jquery';
import { initTabs } from '../../includes/tabs';
import {
  submitCreationForm,
  SearchController,
} from '../../includes/chooserModal';

const ajaxifyTaskCreateTab = (modal) => {
  $(
    '#tab-new a.task-type-choice, #tab-new a.choose-different-task-type',
    modal.body,
  ).on('click', function onClickNew() {
    modal.loadUrl(this.href);
    return false;
  });

  // eslint-disable-next-line func-names
  $('form.task-create', modal.body).on('submit', function () {
    submitCreationForm(modal, this, { errorContainerSelector: '#tab-new' });

    return false;
  });
};

const TASK_CHOOSER_MODAL_ONLOAD_HANDLERS = {
  chooser(modal, jsonData) {
    function ajaxifyLinks(context) {
      $('a.task-choice', context)
        // eslint-disable-next-line func-names
        .on('click', function () {
          modal.loadUrl(this.href);
          return false;
        });

      // eslint-disable-next-line func-names
      $('.pagination a', context).on('click', function () {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        searchController.fetchResults(this.href);
        return false;
      });

      // Reinitialize tabs to hook up tab event listeners in the modal
      initTabs();
    }

    const searchController = new SearchController({
      form: $('form.task-search', modal.body),
      containerElement: modal.body,
      resultsContainerSelector: '#search-results',
      onLoadResults: (context) => {
        ajaxifyLinks(context);
      },
      inputDelay: 50,
    });
    searchController.attachSearchInput('#id_q');
    searchController.attachSearchFilter('#id_task_type');

    ajaxifyLinks(modal.body);
    ajaxifyTaskCreateTab(modal, jsonData);
<<<<<<< HEAD
=======

    $('form.task-search', modal.body).on('submit', search);

    // eslint-disable-next-line func-names
    $('#id_q').on('input', function () {
      if (request) {
        request.abort();
      }
      clearTimeout($.data(this, 'timer'));
      const wait = setTimeout(search, 50);
      $(this).data('timer', wait);
    });

    // eslint-disable-next-line func-names
    $('#id_task_type').on('change', function () {
      if (request) {
        request.abort();
      }
      clearTimeout($.data(this, 'timer'));
      const wait = setTimeout(search, 50);
      $(this).data('timer', wait);
    });
>>>>>>> 24fdc703fd4a99074ed7524de76ba9b39b586845
  },
  task_chosen(modal, jsonData) {
    modal.respond('taskChosen', jsonData.result);
    modal.close();
  },
  reshow_create_tab(modal, jsonData) {
    $('#tab-new', modal.body).html(jsonData.htmlFragment);
    ajaxifyTaskCreateTab(modal, jsonData);
  },
};
window.TASK_CHOOSER_MODAL_ONLOAD_HANDLERS = TASK_CHOOSER_MODAL_ONLOAD_HANDLERS;
