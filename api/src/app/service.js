const createUser = () => {
    const response = { message: "User created" }
    return response;
}

const readUser = (email) => {
    const response = { message: "User data read" }
    return response;
}

const addDiary = () => {
    const response = { message: "Diary added" }
    return response;
}

const updateDiary = () => {
    const response = { message: "Diary data updated" }
    return response;
}

const deleteDiary = () => {
    const response = { message: "Diary data deleted" }
    return response;
}

export { createUser, readUser, addDiary, updateDiary }