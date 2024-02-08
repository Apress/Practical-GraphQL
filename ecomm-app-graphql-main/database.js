const courses = [
    {
        id: "book-06",
        name: "TypeScript Basics",
        description: "TypeScript Basics for beginners",
        price: 599.99,
        discount: false,
        genreId: "cat-01"
    },
    {
        id: "book-07",
        name: "GraphQL Basics",
        description: "GraphQL Basics for beginners",
        price: 499.99,
        discount: true,
        genreId: "cat-01"
    },
    {
        id: "book-08",
        name: "NextJS Basics",
        description: "NextJS Basics for beginners",
        price: 599.99,
        discount: false,
        genreId: "cat-01"
    },
    {
        id: "book-21",
        name: "The Immortals of Meluha",
        description: "Shiva Trilogy -1",
        price: 299.99,
        discount: false,
        genreId: "cat-02"
    },
    {
        id: "book-22",
        name: "The Secret of the Nagas",
        description: "Shiva Trilogy -2",
        price: 199.99,
        discount: true,
        genreId: "cat-02"
    },
    {
        id: "book-23",
        name: "The Oath of the Vayuputras",
        description: "Shiva Trilogy -3",
        price: 599.99,
        discount: false,
        genreId: "cat-02"
    }
]

const genres = [
    { id: 'cat-01', name: 'Technical' },
    { id: 'cat-02', name: 'History' }
]

const reviews = [
    {
        id: "rev-01",
        date: "2021-01-01",
        title: "This is bad",
        comment: "when i bought this it broke the computer",
        rating: 1,
        courseId: "book-06",
    },
    {
        id: "rev-02",
        date: "2021-04-23",
        title: "This is good",
        comment: "one of the most decent books",
        rating: 5,
        courseId: "book-06",
    },
    {
        id: "rev-03",
        date: "2020-04-23",
        title: "is okay",
        comment: "yes it is decent i guess, but not great",
        rating: 2,
        courseId: "book-06",
    },
    {
        id: "rev-04",
        date: "2020-07-23",
        title: "terrible",
        comment: "why is it so expensive",
        rating: 1,
        courseId: "book-06",
    },
    {
        id: "rev-05",
        date: "2021-01-01",
        title: "best thing ever",
        comment: "really good book",
        rating: 5,
        courseId: "book-07",
    },
    {
        id: "rev-06",
        date: "2021-04-23",
        title: "SUPER HAPPY",
        comment: "this is amazing, only 4 stars tho... :)",
        rating: 4,
        courseId: "book-07",
    },
    {
        id: "rev-07",
        date: "2020-04-23",
        title: "life changing book",
        comment: "writing good book is so good...",
        rating: 5,
        courseId: "book-07",
    },
    {
        id: "rev-08",
        date: "2022-07-23",
        title: "This is coooooool!",
        comment: "I would totally recommend this book",
        rating: 5,
        courseId: "book-07",
    },
    {
        id: "rev-09",
        date: "2022-07-23",
        title: "idc",
        comment: "It's a spoon...",
        rating: 3,
        courseId: "book-07",
    },
    {
        id: "rev-10",
        date: "2021-07-23",
        title: "terrible!!!!!!",
        comment:
            "Not good at all!! Most of the code in the book is not working",
        rating: 1,
        courseId: "book-08",
    },
    {
        id: "rev-11",
        date: "2021-07-23",
        title: "great",
        comment: "Great for writing such a nice book",
        rating: 5,
        courseId: "book-08",
    },
    {
        id: "rev-12",
        date: "2022-07-23",
        title: "Written well",
        comment: "Strong an rock",
        rating: 5,
        courseId: "book-08",
    },
    {
        id: "rev-13",
        date: "2022-07-23",
        title: "Book grew on you",
        comment: "This book grows on you!",
        rating: 4,
        courseId: "book-08",
    },
    {
        id: "rev-14",
        date: "2020-07-23",
        title: "The best mythological book",
        comment: "A great combination of fact and sprituality",
        rating: 5,
        courseId: "book-21",
    },
    {
        id: "rev-15",
        date: "2021-07-25",
        title: "Amazing read",
        comment: "The book was absolutely how I have had heard about it. This was one of those books which made me restless until I finished the book.",
        rating: 5,
        courseId: "book-21",
    },
    {
        id: "rev-16",
        date: "2021-08-23",
        title: "Amazing book",
        comment: "It's an absolute masterpiece. I know there have also been very critical comments on this books. But this book was a great one for me.",
        rating: 5,
        courseId: "book-21",
    },
    {
        id: "rev-18",
        date: "2023-01-23",
        title: "Interesting",
        comment: "Overall it is interesting to read. But didn't understand why he choose to write fiction.",
        rating: 5,
        courseId: "book-22",
    },
    {
        id: "rev-19",
        date: "2021-07-23",
        title: "Awesome..Interesting",
        comment: "I want to read all Books of Amish",
        rating: 5,
        courseId: "book-22",
    },
    {
        id: "rev-20",
        date: "2022-07-23",
        title: "Good",
        comment: "Its came with a really nice quality and this one of my fav book series as I am from India",
        rating: 5,
        courseId: "book-22",
    },
    {
        id: "rev-21",
        date: "2020-07-23",
        title: "Absolutely love it.",
        comment: "In love with the masterpieces created by Amish. If you are thinking of starting reading books, and don't know from where to start.",
        rating: 5,
        courseId: "book-23",
    },
    {
        id: "rev-22",
        date: "2021-07-23",
        title: "Read it",
        comment: "Its a good book to read. The trilogy is beautifully narrated. All the events seem real. You will just fall in love with the characters.",
        rating: 5,
        courseId: "book-23",
    },
    {
        id: "rev-23",
        date: "2022-03-13",
        title: "Awesome Writings",
        comment: "Beautiful narration and very much easy to get involved.",
        rating: 5,
        courseId: "book-23",
    },
];

exports.db = { courses, genres, reviews }