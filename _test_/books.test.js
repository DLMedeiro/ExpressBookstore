const { request } = require("http");
const db = require("../db");
const Book = require("../models/book");
const app = require("../app");

let testBook;
beforeEach(async function () {
    await db.query("DELETE FROM books")

    const result = await db.query(
        `INSERT INTO books 
        (isbn, amazon_url, author, language, pages, publisher, title, year)
        VALUES ('0000000000','http://a.co/eobPtX2','Test1','english','264','Test1','Test1','2017')
        RETURNING isbn, amazon_url, author, language, pages, publisher, title, year`);

    testBook = result.rows[0];

});
describe("Test Book class", function () {
    test("can create", async () => {
        let b = await Book.create({
            "isbn": "1111111111",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Test2",
            "language": "english",
            "pages": 264,
            "publisher": "Test2",
            "title": "Test2",
            "year": 2017
        });

        expect(b).toEqual({
            "isbn": "1111111111",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Test2",
            "language": "english",
            "pages": 264,
            "publisher": "Test2",
            "title": "Test2",
            "year": 2017 
        });
    });

    test("find one", async () => {
        let b = await Book.findOne("0000000000");
        expect(b).toEqual({
            "isbn": "0000000000",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Test1",
            "language": "english",
            "pages": 264,
            "publisher": "Test1",
            "title": "Test1",
            "year": 2017
        })
    })

    test("get all", async () => {
        let b = await Book.findAll();
        expect(b).toEqual([{
            "isbn": "0000000000",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Test1",
            "language": "english",
            "pages": 264,
            "publisher": "Test1",
            "title": "Test1",
            "year": 2017
        }])
    })

    test("update", async () => {
        const data =
            {"amazon_url": "http://a.co/eobPtX2",
            "author":"Test1",
            "language":"english",
            "pages": 500,
            "publisher":"Test1",
            "title": "Test1",
            "year": 2017};

        let b = await Book.update("0000000000", data)
    
        expect(b).toEqual({
            "isbn": "0000000000",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Test1",
            "language": "english",
            "pages": 500,
            "publisher": "Test1",
            "title": "Test1",
            "year": 2017
        })
    })

    test("delete", async () => {
        await Book.remove(testBook.isbn)
        let b = await Book.findOne(testBook.isbn);
        expect(b).toBe("There is no book with an isbn 0000000000")
    })

});

// describe('DELETE /books/:isbn', () => {
//     test('delete book', async() => {
//         const response = await request(app).remove(`/books/${testBook.isbn}`);
//     expect(response.body).toEqual({"message": "There is no book with an isbn 0000000000"})
//     })
// });

afterAll(async function() {
    await db.end();
  });