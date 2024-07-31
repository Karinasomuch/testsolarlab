const data = {
    page: 1,
    per_page: 12,
    lastPage: 0
}

const getData = () => {
    const query = "";
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.unsplash.com/search/photos?page=${data.page}&per_page=${data.per_page}&query='${query}'`);
    xhr.setRequestHeader('Authorization', 'Client-ID grp2FlbDAPmO80waRy7qH0nuxv6MXUuJYlGpMdQT9hs');
    xhr.send();
    xhr.onload = () => {
        const res = JSON.parse(xhr.response);
        const imagesBlock = document.getElementById('Images');
        imagesBlock.innerHTML = '';

        res.results.forEach(image => {
            const imageElement = document.createElement('img');
            imageElement.setAttribute('class', 'image');
            imageElement.setAttribute('src', image.urls.small);
            imagesBlock.appendChild(imageElement);
        });
        data.lastPage = res.total_pages;

        document.getElementById('Total').innerText = res.total;
    }
}

const setPage = (page) => {
    data.page = page;
    document.getElementById('Page').innerText = page;
}

const firstPage = () => {
    setPage(1);
    getData();
}

const lastPage = () => {
    setPage(data.lastPage);
    getData();
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

getData();