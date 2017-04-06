import 'whatwg-fetch'
// import { Promise } from 'es6-promise'

import alt from '../utils/alt'
import PostModel from '../models/post-model'
import { List } from 'immutable'

class NewsActions {
  static fetchPromise () {
    return new Promise((resolve, reject) => {
      fetch('/api/posts')
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json()
        } else {
          let err = new Error(response.statusText)
          err.response = response
          throw err
        }
      })
      .then((data) => {
        let posts = data.map((props) => {
          return new PostModel(props)
        })
        resolve(new List(posts))
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  static addPromise (postTitle, postDescription) {
    return new Promise((resolve, reject) => {
      fetch('/api/post', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: postTitle,
          description: postDescription
        })
      })
      .then((response) => {
        if (response.status === 201) {
          resolve()
        } else {
          reject('Unexpected status code')
        }
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  static editPromise (postId, postTitle, postDescription) {
    return new Promise((resolve, reject) => {
      fetch(`/api/post/${postId}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: postTitle,
          description: postDescription
        })
      })
      .then((response) => {
        if (response.status === 204) {
          resolve()
        } else {
          reject('Unexpected status code')
        }
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  static removePromise (postId) {
    return new Promise((resolve, reject) => {
      fetch(`/api/post/${postId}`, {
        method: 'delete'
      })
      .then((response) => {
        if (response.status === 204) {
          resolve()
        } else {
          reject('Unexpected status code')
        }
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  update (posts) {
    return posts
  }

  onAdd (post) {
    return post
  }

  onEdit (post) {
    return post
  }

  onRemove (postId) {
    return postId
  }

  fetch () {
    return (dispatch) => {
      dispatch()

      NewsActions
      .fetchPromise()
      .then((posts) => {
        this.update(posts)
      })
      .catch((err) => {
        this.failed(err)
      })
    }
  }

  add (postTitle, postDescription) {
    return (dispatch) => {
      dispatch()

      NewsActions
      .addPromise(postTitle, postDescription)
      .then(() => {
      })
      .catch((err) => {
        this.failed(err)
      })
    }
  }

  edit (postId, postTitle, postDescription) {
    return (dispatch) => {
      dispatch()

      NewsActions
      .editPromise(postId, postTitle, postDescription)
      .then(() => {
      })
      .catch((err) => {
        this.failed(err)
      })
    }
  }

  remove (postId) {
    return (dispatch) => {
      dispatch()

      NewsActions
      .removePromise(postId)
      .then(() => {
      })
      .catch((err) => {
        this.failed(err)
      })
    }
  }

  failed (err) {
    return err
  }
}

export default alt.createActions(NewsActions)
