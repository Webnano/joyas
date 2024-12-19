document.getElementById('filterBtn').addEventListener('click', function() {
    document.getElementById('filterPopup').classList.toggle('active');
});

document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('filterPopup').classList.remove('active');
});

document.getElementById('applyFilters').addEventListener('click', function() {
    const precioMin = document.getElementById('precioMin').value;
    const precioMax = document.getElementById('precioMax').value;
    const categoria = document.getElementById('categoria').value;
    const metal = document.getElementById('metal').value;

    fetch(`/api/joyas/filtros?precio_min=${precioMin}&precio_max=${precioMax}&categoria=${categoria}&metal=${metal}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error('Data is not an array');
            }
            const filteredJewelryTable = document.getElementById('filteredJewelryTable').getElementsByTagName('tbody')[0];
            filteredJewelryTable.innerHTML = '';  // Limpiar la tabla antes de agregar nuevas filas
            data.forEach(jewel => {
                const row = filteredJewelryTable.insertRow();
                row.insertCell(0).textContent = jewel.nombre;
                row.insertCell(1).textContent = jewel.categoria;
                row.insertCell(2).textContent = jewel.metal;
                row.insertCell(3).textContent = `$${jewel.precio}`;
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

// Cargar todas las joyas al cargar la página
fetch('/api/joyas?limits=10&page=1&order_by=nombre')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (!Array.isArray(data)) {
            throw new Error('Data is not an array');
        }
        const jewelryTable = document.getElementById('jewelryTable').getElementsByTagName('tbody')[0];
        jewelryTable.innerHTML = '';  // Limpiar la tabla antes de agregar nuevas filas
        data.forEach(jewel => {
            const row = jewelryTable.insertRow();
            row.insertCell(0).textContent = jewel.nombre;
            row.insertCell(1).textContent = jewel.categoria;
            row.insertCell(2).textContent = jewel.metal;
            row.insertCell(3).textContent = `$${jewel.precio}`;
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
