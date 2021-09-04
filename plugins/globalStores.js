import useHistoryStore from '~/stores/historyStore';

export default (context, inject) => {
  inject('useHistoryStore', useHistoryStore);

  useHistoryStore()?.loadFromStorage();
};
