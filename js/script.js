const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const toggleLoader = () => {
  const loader = document.querySelector('#loader');
  loader.hasAttribute('hidden') ? loader.removeAttribute('hidden') : loader.setAttribute('hidden', '');
};

const createUserRecord = (name = '') => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.setAttribute('href', '!#');
  a.textContent = name;
  const userRecord = li.appendChild(a);
  return userRecord;
};

const createUserList = (users = []) => {
  const listWrapper = document.querySelector('#data-container');
  for (const user of users) {
    const newRecord = createUserRecord(user.name);
    listWrapper.append(newRecord);
  }
};

const getUsers = () => {
  toggleLoader();

  const result = fetch(USERS_URL);

  result
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch url ${USERS_URL} with status ${response.status}.`);
      }
      return response.json();
    })
    .then((users) => createUserList(users))
    .catch((error) => console.error(error))
    .finally(() => {
      toggleLoader();
    });
};

getUsers();
