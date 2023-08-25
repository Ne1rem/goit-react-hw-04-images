const API_KEY = '28342095-bdb3373d4270e11a929e663ef';

function fetchImages(searchInput, page) {
    return fetch(`https://pixabay.com/api/?q=${searchInput}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`).then(response => {
        if (response.ok) {
            return response.json()
        }
        return Promise.reject(new Error(`There is no results with such request ${searchInput}`))
    })
}

const api = {
    fetchImages,
}

export default api