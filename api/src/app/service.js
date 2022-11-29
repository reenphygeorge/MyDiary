import prisma from "./prisma";

const createUser = async (data) => {
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            content: data.content
        },
    });
}

const readUser = async (email) => {
    return await prisma.user.findUnique({
        where: {
            email
        }
    })
}

const updateDiary = async (email, data) => {
    let oldContent = await readUser(email)
    oldContent = [...oldContent.content]
    oldContent.push(data)
    const newContent = { content: oldContent };
    return await prisma.user.update({
        where: {
            email
        },
        data: newContent
    })
}

const deleteDiary = async (email, id) => {

}

export { createUser, readUser, updateUser }