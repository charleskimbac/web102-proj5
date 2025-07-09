import { useState } from 'react'
import Card from './Card';
import './App.css';

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
    const [catData, setCatData] = useState(null);
    const [banList, setBanList] = useState([]);

    const fetchData = async () => {
        const url = "https://api.api-ninjas.com/v1/cats?min_weight=1";
        const response = await fetch(url, {
            mode: 'cors',
            headers: {
                'X-Api-Key': API_KEY,
                'User-Agent': 'My-App',
            'Accept': '*/*',
            },
        })
        const data = await response.json();
        return data[Math.floor(Math.random() * data.length)];
    }
    
    const handleClick = async () => {
        const data = await fetchData();
        console.log(data);
        setCatData(data);

        if (banList.filter(item => item.param === "shedding" && item.value === data.shedding).length > 0) {
            console.log("Banned shedding value, fetching new data...");
            return handleClick();
        }
        if (banList.filter(item => item.param === "playfulness" && item.value === data.playfulness).length > 0) {
            console.log("Banned playfulness value, fetching new data...");
            return handleClick();
        }
        if (banList.filter(item => item.param === "family_friendly" && item.value === data.family_friendly).length > 0) {
            console.log("Banned family_friendly value, fetching new data...");
            return handleClick();
        }
    }

    const addToBan = (param, value) => {
        setBanList((prevBanList) => {
            const newBanList = [...prevBanList, { param, value }];
            console.log(newBanList);
            return newBanList;
        });
    }

    const removeFromBan = (param, value) => {
        setBanList((prevBanList) => {
            const newBanList = prevBanList.filter(item => !(item.param === param && item.value === value));
            console.log(newBanList);
            return newBanList;
        });
    }

    return (
        <>
            <h2>Get Random Cats</h2>
            {catData && <Card {...catData} addToBan={addToBan} removeFromBan={removeFromBan} />}
            <br />
            {banList.length > 0 && <h2 style={{marginBottom: "2px"}}>Ban list</h2>}
            {banList.length > 0 && banList.map(({ param, value }) => (
                <div key={`${param}-${value}`}>
                    <button onClick={() => removeFromBan(param, value)}>{`${param}: ${value}`}</button>
                </div>
            ))}
            <br />
            <button onClick={handleClick}>Discover</button>
        </>
    )
}

export default App