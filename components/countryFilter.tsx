import { useEffect, useState, forwardRef } from "react"
import axios from 'axios'
import { useRouter } from "next/router"
import { Country, DataColumn } from "../models/Country"
import styles from "../styles/Country.module.css"
import MaterialTable, { Icons } from "material-table"

import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

const tableIcons: Icons = {
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
}

function CountryFilter() {
    let columns: DataColumn[] = [
        { title: 'code', field: 'code' },
        { title: 'name', field: 'name' } 
    ]
    const [ countryCode, setCountryCode ] = useState<string>('ALL')
    const [ countryList, setCountryList ] = useState<Country[]>([])
    const [ refresh, setRefresh ] = useState<boolean>(false)
    const router = useRouter()    
    
    // fetching full country list on page load
    useEffect(() => {
        const headers = {
            "content-type": "application/json; charset=utf-8"
        };
        const graphqlQuery = {
            "query": `query {
                 countries {
                    code
                    name
                 }
               }`,
             "variables": {}
        };
        axios({
            url: process.env.NEXT_PUBLIC_API_ENDPOINT,
            method: 'post',
            headers: headers,
            data: graphqlQuery
        }).
        then((response) => {
            console.log('Fetching country list : ', response.data)
            setCountryList([...response.data.data.countries])
        })
        .catch((error) => {
            console.log('Error while fetching country list : ', error)
            router.push('/404');
        });
    }, [refresh])

    // fetching country details based on country code entered by user
    useEffect(() => {
        if(countryCode.length == 2) {
            const headers = {
                "content-type": "application/json; charset=utf-8"
            };
            const graphqlQuery = {
                "query": `query {
                    country(code: "${countryCode.toUpperCase()}") {
                      code  
                      name
                    }
                  }`,
                "variables": {}
            };
    
            axios({
                url: process.env.NEXT_PUBLIC_API_ENDPOINT,
                method: 'post',
                headers: headers,
                data: graphqlQuery
            }).
            then((response) => {
                console.log('Fetching specific country details with user entered data')
                if(response.data.data.country.code !== null) setCountryList([response.data.data.country])    
            })
            .catch((error) => {
                console.log('Error while fetching specific country details')
            });
        }
    }, [countryCode])

    const handleCountryCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => { setCountryCode(e.target.value) }
    const refreshCountryList = () => {
        setCountryCode('ALL')
        setRefresh(!refresh)
    }
    return (
        <>  
            <div className={styles.mainDiv}>
                <h1>Country Filter</h1>
                <label>Enter country code : </label>
                <input type="text" id="country-code" name="country-code" value={countryCode} onChange={(e) => handleCountryCodeChange(e)} />
                <button className={styles.refreshBtn} type="button" onClick={() => refreshCountryList()}>Refresh</button>
                <div className={styles.tableDiv}>
                    <MaterialTable title="Country List" 
                    options={{search: false, draggable: false, showEmptyDataSourceMessage: true}}  
                    columns={columns} data={countryList} icons={tableIcons}/>
                </div>
            </div>
        </>
    )
}

export default CountryFilter