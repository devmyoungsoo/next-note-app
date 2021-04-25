import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {Button, Form, Loader} from "semantic-ui-react";

import fetch from "isomorphic-unfetch";

const EditNote = ({note}) => {
    const [form ,setForm] = useState({title: note.title,description: note.description});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(()=> {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateNote();
            }
            else setIsSubmitting(false);
        }
    },[errors])

    const updateNote = async () => {
        try {
            const res = await fetch(`${process.env.SERVER_NAME}/api/notes/${router.query.id}`,{
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/");
        } catch(e) {
            console.error(e);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let err = {};

        if (!form.title) {
            err.title = "Title is required";
        }
        if(!form.description) {
            err.description = "Description is required";
        }

        return err;
    }

    return (
        <div className="form-container">
            <h1>Update Note</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline="centered" />
                        :
                        <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.title ?
                                    {content: "Please enter a title",pointing: "below"}
                                    : null}
                                label="Title"
                                placeholder="Title"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                            />
                            <Form.TextArea
                                fluid
                                label="Description"
                                error={errors.description ?
                                    {content: "Please enter a description",pointing: "below"}
                                    : null}
                                placeholder="Description"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                            >
                            </Form.TextArea>
                            <Button type="submit">Create</Button>
                        </Form>

                }
            </div>
        </div>
    )
}

EditNote.getInitialProps = async ({query: {id}}) => {
    const req = await fetch(`${process.env.SERVER_NAME}/api/notes/${id}`);
    const {data} = await req.json();
    return {note: data}
}

export default EditNote;