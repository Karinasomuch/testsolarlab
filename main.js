const data = {
    page: 1,
    per_page: 12,
    lastPage: 0
}

const getData = () => {
    const query = document.getElementById('Search')?.value;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.unsplash.com/search/photos?page=${data.page}&per_page=${data.per_page}&query='${query}'`);
    xhr.setRequestHeader('Authorization', 'Client-ID grp2FlbDAPmO80waRy7qH0nuxv6MXUuJYlGpMdQT9hs');
    xhr.send();
    xhr.onload = () => {
        const res = JSON.parse(xhr.response);
        const imagesBlock = document.getElementById('Images');
        imagesBlock.innerText = '';

        res.results.forEach(element => {
            const imgElement = document.createElement('img');
            imgElement.setAttribute('src', element.urls.small);
            imgElement.setAttribute('class', 'image');
            imagesBlock.appendChild(imgElement);
        });
        data.lastPage = res.total_pages;
    }
}

const setPage = (page) => {
    data.page = page;
    document.getElementById('Page').innerText = data.page;
}

const prevPage = () => {
    const pageToChange = data.page - 1;
    if (pageToChange) {
        setPage(pageToChange);
        getData();
    }
}

const nextPage = () => {
    const pageToChange = data.page + 1;
    if (pageToChange <= data.lastPage) {
        setPage(pageToChange);
        getData();
    }
}

const firstPage = () => {
    setPage(1);
    getData();
}

const lastPage = () => {
    setPage(data.lastPage);
    getData();
}

getData();