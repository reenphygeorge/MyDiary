import prisma from "./prisma";

const createUser = async ({ name, email }) => {
    const user = await prisma.user.create({
        data: {
            name,
            email,
            content: []
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

const addDiary = async (email, data) => {
    let oldContent = await readUser(email)
    oldContent = [...oldContent.content]
    oldContent.push(data)
    const newContent = { content: oldContent };
    console.log(newContent);
    return await prisma.user.update({
        where: {
            email
        },
        data: newContent
    })
}

const updateDiary = async (email, cid, { date, heading, body }) => {
    let oldContent = await readUser(email)
    oldContent = [...oldContent.content]
    const newContent = { content: oldContent };
    newContent.content.forEach(element => {
        element.id === cid ?
            (
                element.date = date,
                element.heading = heading,
                element.body = body
            ) : null
    });
    return await prisma.user.update({
        where: {
            email
        },
        data: newContent
    })
}

// const deleteDiary = async (email, cid) => {
//     let oldContent = await readUser(email)
//     oldContent = [...oldContent.content]
//     let newContent = { content: oldContent };
//     console.log(newContent.content)

//     newContent.content.forEach((content, index) => {
//         if (index == content.id) {
//             newContent.content.splice(index, 1);
//         }
//         console.log(newContent);
//     });
//     return await prisma.user.update({
//         where: {
//             email
//         },
//         data: newContent
//     })
// }

export { createUser, readUser, addDiary, updateDiary }