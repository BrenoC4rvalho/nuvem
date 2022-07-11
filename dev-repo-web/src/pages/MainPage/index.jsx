import React,{useState, useEffect} from "react";
import { Link } from 'react-router-dom';


import Nav from "./Nav";
import Search from "./Search";
import Repositories from "./Repositories";

import { getRepositories, createRepository, destroyRepository } from "../../services/api";

import "./styles.css"

const userId = '61fc14f45b84768e3201eb90'

const MainPage = () => {
    const [repositories, setRepositories] = useState([])
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(false)

    const loadData = async (query = '') => {
        try {
            const response = await getRepositories(userId, query);
            setRepositories(response.data)            
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoadingError(true);
        }
    }

    useEffect(() => {
        (async () => await loadData())();
    }, [])

    const handleLogout = () => {
        console.log('logout')
    }

    const handleSearch = (query) => {
        loadData(query);
    }

    

    const handleDeleteRepo = async (repository) => {
        console.log('delete repo')
        await destroyRepository(userId, repository._id);
        await loadData();
    }

    const handleNewRepo = async (url) => {
        try {
            await createRepository(userId, url);
            await loadData();
        } catch (err) {
            console.error();
            setLoadingError(true);
        }
    }

    if(loadingError) {
        return(
            <div className="loading">
                Erro ao carregar os dados de repositório. <Link to="/login">Voltar</Link>
            </div>
        )
    }

    if(loading) {
        return  (
            <div className="loading">
                Carregando...
            </div>
        )
    }

    return (
        <div id="main">
            <Nav onLogout={handleLogout} />    

            <Search onSearch={handleSearch}/>

            <Repositories repositories={repositories} onDeleteRepo={handleDeleteRepo} onNewRepo={handleNewRepo} />

        </div>
    )
} 

export default MainPage;