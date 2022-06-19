import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Modal } from "../../../components/Modal";

import {Container, Input} from './style';

interface Book {
  id: number;
  bookName: string;
  author: string;
  publisher: string;

}
interface handleAddBook {
  handleAddBook: (dataBook: Omit<Book, 'id'>) => void;
}

export const AddBook = () => {
    const navigate = useNavigate()
    const {handleAddBook} = useOutletContext<handleAddBook>()
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>()

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      console.log(data, 'Add Book')
        const {bookName, author, publisher} = data

        handleAddBook({
          bookName: bookName,
          author: author,
          publisher: publisher
        })

        navigate('/books')
    }

  return (
    <Modal>
      <AiOutlineClose
        className="close-modal-button"
        onClick={() => navigate("/books")}
      />
      <Container onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <label htmlFor="id-book">Nome do livro</label>
          <Input
            type="text"
            id="book-name"
            isError={errors.bookName}
            {...register("bookName", { required: "Preencha esse campo!" })}
          />
          {errors.bookName?.message && <small>{errors.bookName?.message}</small>}
        </div>
        <div className="input-container">
          <label htmlFor="author-name">Nome do Autor</label>
          <Input
            type="text"
            id="author-name"
            isError={errors.author}
            {...register("author", { required: "Preencha esse campo!" })}
          />
          {errors.author?.message && (
            <small>{errors.author?.message}</small>
          )}
        </div>
        <div className="input-container">
          <label htmlFor="publisher-name">Nome da editora</label>
          <Input
            type="text"
            id="publisher-name"
            isError={errors.publisher}
            {...register("publisher", { required: "Preencha esse campo!" })}
          />
          {errors.publisher?.message && <small>{errors.publisher?.message}</small>}
        </div>
        <div className="input-container">
          <input type="submit" value="Emprestar" />
        </div>
      </Container>
    </Modal>
  );
};
