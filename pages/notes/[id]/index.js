import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Button, Confirm, Loader} from "semantic-ui-react";

import fetch from "isomorphic-unfetch";

const Note = ({note}) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(()=> {
        if (isDeleting) deleteNote();
    },[isDeleting])

    const open = () => setConfirm(true);

    const close = () => setConfirm(false);

    const deleteNote = async () => {
        const id = router.query.id;
        try {
            const deleted = await fetch(`${process.env.SERVER_NAME}/api/notes/${id}`,{
                method: "DELETE"
            });
            router.push('/');
        } catch(e) {
            console.error(w)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    return (
        <div className="note-container">
            {isDeleting ?
                <Loader active inline="centered" />
                :
                <>
                    <h1>{note.title}</h1>
                    <p>{note.description}</p>
                    <Button color="red" onClick={open}>Delete</Button>
                </>
            }
            <Confirm
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete}
            />
        </div>
    )
}

Note.getInitialProps = async ({query: {id}}) => {
    const req = await fetch(`${process.env.SERVER_NAME}/api/notes/${id}`)
    const {data} = await req.json();
    return {note: data}
}

export default Note;