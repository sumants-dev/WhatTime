let counter = 4

export const modifyIntroduction = ({image, description}) => (
  {
    type: 'MODIFY_INTRODUCTION',
    image,
    description,
    isModify: false
  }
)

export const toggleModifyIntroduction = () => (
  {
    type: 'TOGGLE_INTRODUCTION'
  }
)

export const toggleActiveAddPost = () => (
  {
    type: 'TOGGLE_ACTIVE'
  }
)

export const addPosts = ({title, image, description}) => (
  {
    type: 'ADD_POST',
    id: counter++,
    title,
    image,
    description,
    isModify: false
  }
)


export const modifyPost = ({id, title, image, description}) => (
  {
    type: 'MODIFY_POST',
    id,
    title,
    image,
    description,
    isModify: false
  }
)

export const toggleModifyPost = id => (
  {
    type: 'TOGGLE_ISMODIFY_POST',
    id
  }

)

export const deletePost = id => (
  {
    type: 'DELETE_POST',
    id
  }
)