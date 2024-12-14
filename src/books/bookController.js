const Book = require("./book.model");

const postABook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res
      .status(200)
      .send({ message: "Book posted successfully", book: newBook });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error encountered whilst try to Post data" });
    console.log(error.message);
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
    console.log(books);
  } catch (error) {
    console.log("Error fetching data", error);
    res
      .status(500)
      .send({ message: "Error encountered whilst try to fetch data" });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.log("Error fetching data", error);
    res
      .status(500)
      .send({ message: "Error encountered whilst try to fetch data" });
  }
};

const updateBookData = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new: true})
        if(!updatedBook) {
            res.status(404).send({ message: " NO Book to be updated" });
        }
        res.status(200).send({message: "Book updated Successfully",
            book: updatedBook
        })
     } catch (error) {
        console.log("Error fetching data", error);
        res
          .status(500)
          .send({ message: "Error encountered whilst try to update data" });
    }
}

const deleteBook = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteABook = await Book.findByIdAndDelete(id)
        if(!deleteABook){
            res.status(404).send({ message: " Book not Found" });
        }
        res.status(200).send({
            message: "book deleted successfully",
            book: deleteABook
        })
    } catch (error) {
        console.log("Error fetching data", error);
        res
          .status(500)
          .send({ message: "Error encountered whilst try to update data" });
    }
}

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBookData,
  deleteBook
};
