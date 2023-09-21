import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from "react-query";
import { removeGame, gameResponse } from "../../Services/gameServices";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { byUser } from "../../Services/authServices";
import { FcCancel } from "react-icons/fc";
import { GiConfirmed } from "react-icons/gi";

const GameData = (props) => {

    const [user, setUser] = useState('');
    const [gameResponsE, setGameResponse] = useState('');


    const { mutate } = useMutation(byUser, {
        onSuccess: (data) => {
            setUser(data);
        },
        onError: (error) => {
        },
    });
    
    const { mutate: gameRespose } = useMutation(gameResponse, {
        onSuccess: (data) => {
            setGameResponse(data);
        },
        onError: (error) => {
        },
    });

    useEffect(() => {
        if (props.appUserId) {
            handleGetGameByUserRespnse(props.appUserId);
            handleGetByUser(props.appUserId);   
        }
    }, [props.appUserId]);

    const handleGetByUser = (userId) => {
        mutate(userId);
    };

    const handleGetGameByUserRespnse = (userId) => {
        gameRespose(userId);
    };

console.log(user);
    const notifyRemove = () => {
        toast.success(`Remove ${user?.data?.userName} Reservation!`, {
            position: toast.POSITION.TOP_CENTER
        });
    };

    const notifyRemoveError = () => {
        toast.error(`Error Remove ${user?.data?.userName} Game.`);
    };

    const queryClient = useQueryClient();

    const handleRemove = async (gameId) => {
        try {
            await removeGame(gameId);
            queryClient.invalidateQueries(["getGame", gameId]);
            queryClient.invalidateQueries(["getGame"]);
            queryClient.invalidateQueries(["gameCount"]);
            notifyRemove();
        } catch (error) {
            notifyRemoveError();
        }
    };

    return (
        <>
            <tbody>
                <tr>
                    <td>{props.number}</td>
                    <td>{user?.data?.userName}</td>
                    <td style={{fontSize:"36px"}}>{gameResponsE?.data === false ? <FcCancel /> : <GiConfirmed color='green' />}</td>
                    <Link to={`/UserDetails/${props.appUserId}`}><td><Button>User Details</Button></td></Link>
                    <td><Button onClick={() => handleRemove(props.Id)} variant="danger">Remove</Button></td>
                </tr>
            </tbody>
        </>
    );
};

export default GameData;
