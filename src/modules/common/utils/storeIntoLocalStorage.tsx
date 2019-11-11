const storeIntoLocalStorage = (name: string, data: Object) => {
  const storage = window.localStorage;

  storage.setItem(name, JSON.stringify(data));
};

export default storeIntoLocalStorage;
