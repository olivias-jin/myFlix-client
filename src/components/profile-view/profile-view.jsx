import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Card } from "react-bootstrap";
import './profile-view.scss';


export const ProfileView ({ user, movie, onUpdatedUserInfo, onDeleteUser }) => {

    // Updated User Info
    const [user, setUser] = useState(localUser.Username || "");
    const [password, setPassword] = useState(localUser.password || "");
    const [email, setEmail] = useState(localUser.email || "");
    const [birthday, setBirthday] = useState(localUser.birthday || "01/01/0001");


    // Deregister
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone."))
        {
            onDeleteUser(user.id);
        }
    };

    return (
        <Row className="justify-content-md-center">
            <Card>
                <Col>
                    <Card.Header>
                        <UserInfo
                            name={user.Username}
                            email={user.Email}
                        />
                    </Card.Header>
                </Col>

                <Col>
                    <Card.Body>
                        <ProfileUpdate
                            username={username}
                            password={password}
                            email={email}
                            birthday={birthday}
                        />
                    </Card.Body>
                    <Card.Body>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete User
                        </Button>
                    </Card.Body>
                </Col>
            </Card>
        </Row >
    )


}






