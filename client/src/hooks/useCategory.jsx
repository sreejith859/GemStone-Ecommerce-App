import { useState, useEffect } from "react";
import axios from "axios";
import { REACT_APP_API } from "../Components/Constant/Constant";

export default function useCategory() {
    const [categories, setCategories] = useState([])
    //get categories
    const getCategories = async (req, res) => {
        try {
            const { data } = await axios.get(`${REACT_APP_API}/api/v1/category/get-category`)
            setCategories(data?.category)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCategories()
    }, [])

    return categories;
}