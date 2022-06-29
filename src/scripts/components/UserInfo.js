export  default class UserInfo {
    constructor({ name, job, avatar}) {
      this._name = document.querySelector(name);
      this._job = document.querySelector(job);
      this._avatar = document.querySelector(avatar);
    }
  
    // возвращает объект с данными пользователя
    getUserInfo() {
      const userInfo = {
        name: this._name.textContent,
        job: this._job.textContent,
        avatar: this._avatar.src
      }
      return userInfo;
    }
  
    // принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(data) {
      this._name.textContent = data.name;
      this._job.textContent = data.about;
      this._avatar.src = data.avatar;
    }
  }
  