import Link from "next/link";
import fetch from "isomorphic-unfetch";
import {Button, Card } from "semantic-ui-react";

const Index = ({notes}) => {
    return (
        <div className="notes-container">
            <h1>Notes</h1>
            <div className="grid wrapper">
                {
                    notes.map(note => {
                        return (
                            <div key={note._id}>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>
                                            <Link href={`/notes/${note._id}`}>
                                                <a>{note.title}</a>
                                            </Link>
                                        </Card.Header>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Link href={`/notes/${note._id}`}>
                                            <Button primary>View</Button>
                                        </Link>
                                        <Link href={`/notes/${note._id}/edit`}>
                                            <Button primary>Edit</Button>
                                        </Link>
                                    </Card.Content>
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

Index.getInitialProps = async () => {
    const res = await fetch(`${process.env.SERVER_NAME}/api/notes`);
    const { data } = await res.json();
    return {notes: data}
}


export default Index;