const { v4: uuid } = require("uuid");

exports.Mutation = {
    addGenre: (parent, args, { db }) => {
        const { input } = args;
        const { name } = input;
        const newGene = { id: uuid(), name }
        db.genres.push(newGene)
        return newGene
    },
    addCourse: (parent, args, { db }) => {
        const { input } = args;
        const { name, description, price, discount, genreId } = input;
        const newCourse = { id: uuid(), name, description, price, discount, genreId }
        db.courses.push(newCourse)
        return newCourse
    },
    addReview: (parent, args, { db }) => {
        const { input } = args;
        const { date, title, comment, rating, courseId } = input;
        const newReview = { id: uuid(), date, title, comment, rating, courseId }
        db.reviews.push(newReview)
        return newReview
    },
    deleteGenre: (parent, { id }, { db }) => {
        db.genres = db.genres.filter(genre => genre.id !== id);
        db.courses = db.courses.map(course => {
            if(course.genreId === id){
                return {...course, genreId: null}
            } else {
                return course
            }
        })
        return true;
    },
    deleteCourse: (parent, { id }, { db }) => {
        db.courses = db.courses.filter(course => course.id !== id);
        db.reviews = db.reviews.filter(review => review.courseId !== id);
        return true;
    },
    deleteReview: (parent, { id }, { db }) => {
        db.reviews = db.reviews.filter(review => review.id !== id);
        return true;
    },
    updateGenre: (parent, { id, input }, { db }) => {
        const index = db.genres.findIndex(genre => genre.id === id);
        if(index === -1) return null
        db.genres[index] = {...db.genres[index], ...input};
        return db.genres[index];
    },
    updateCourse: (parent, { id, input }, { db }) => {
        const index = db.courses.findIndex(course => course.id === id);
        if(index === -1) return null
        db.courses[index] = {...db.courses[index], ...input};
        return db.courses[index];
    },
    updateReview: (parent, { id, input }, { db }) => {
        const index = db.reviews.findIndex(review => review.id === id);
        if(index === -1) return null
        db.reviews[index] = {...db.reviews[index], ...input};
        return db.reviews[index];
    }
}