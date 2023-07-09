# Documentacion del componente SearchBox
## Descripcion:
Este componente provee un campo de texto para realizar búsquedas y un botón para disparar el evento de búsqueda, que permite a los usuarios realizar búsquedas a través de una API proporcionada y recibir resultados filtrados en tiempo real. 

## Tecnologias usadas
A continuación se enlistan las tecnologías y librerías utilizadas en el desarrollo de este componente:
* Vue 3
* Axios
* Preprocesador SCSS
* Vue Test Utils
* Vitest

## Caracteristicas del componente
### Props
El componente  SearchBox tiene dos propiedades: 
* **apiUrl** (String, obligatoria): URL de la API de la que se deben obtener los datos para la búsqueda. 
* **searchField** (String, opcional, valor predeterminado = 'name'): El campo a utilizar para las búsquedas en los datos que retorna la API. 

### Data
Este componente define 4 datos: 
* **searchQuery** (String): El texto actual de búsqueda ingresado por el usuario. 
* **results** (Array): Los resultados de la búsqueda. 
* **error** (String): Cualquier error que ocurra durante la búsqueda. 
* **isLoading** (Boolean): Un indicador para verificar si la búsqueda está en progreso. 

### CSS
* Los estilos están definidos en la seccion de <style> y usan la extencion .scss.
* Los estilos están "scoped", lo que significa que solo se aplicarán a este componente y no afectarán a otros componentes de la aplicación donde se reutilice.
* Se pueden modificar las variables *$search-background* y *$search-border-color* para cambiar el color de fondo y el color del borde del cuadro de texto respectivamente.

### Métodos 
El componente tiene los siguientes métodos: 
* **updateSearchQuery(value)**: Este método actualiza la query de búsqueda con el valor ingresado en el campo de búsqueda. 
* **performSearch**: Este método realiza la búsqueda. Si el campo de búsqueda está vacío, la búsqueda no se realiza. Este método también maneja el estado de carga y de error. 

### Eventos emitidos
El componente emite tres eventos personalizados que los componentes padre pueden escuchar:
* **results**:  Este evento se emite cuando se completa una búsqueda. Envía los resultados de la búsqueda como parámetro.
* **search-error**: Este evento se emite cuando ocurre un error durante la búsqueda. Envía un mensaje de error como parámetro.
* **loading**: Este evento se emite cuando la búsqueda comienza (enviando true como parámetro) y cuando la búsqueda termina (enviando false como parámetro).

## Uso del componente
Para utilizar este componente, primero se debe descargar el archivo *SearchBox.vue* que se encuentra dentro de *src/components* y agregarlo al proyecto donde se reutilizara. 
Dentro del proyecto se debe de importar e incluir en los componentes de la instancia de Vue.

Puedes pasar las propiedades requeridas (apiUrl, searchField) y escuchar los eventos emitidos (@results, @search-error, @loading) para manejar los resultados, errores y el estado de carga de la búsqueda, respectivamente.

A continuacion un ejemplo:

```vue 
<template>
<div>
    <search-box 
        api-url="https://64766fef9233e82dd53a050e.mockapi.io/api/products" 
        search-field="name" 
        @results="handleResults" 
        @search-error="handleError" 
        @loading="handleLoading" 
    />

    <div v-if="isLoading" class="loading-indicator">
        Cargando...
    </div>

    <div v-if="results.length">
        <h2>Resultados de la búsqueda:</h2>
        <ul>
            <li v-for="(result, index) in results" :key="index">
                {{ result.name }}
            </li>
        </ul>
    </div>

    <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
    </div>
</div>
</template>

<script>
import SearchBox from './components/SearchBox.vue';

export default {
    components: {
        SearchBox
    },
    data() {
        return {
            results: [],
            errorMessage: '',
            isLoading: false
        };
    },
    methods: {
        handleResults(results) {
            this.results = results;
            if (results.length === 0) {
                this.errorMessage = 'No se encontraron resultados para tu búsqueda.';
            } else {
                this.errorMessage = '';
            }
        },
        handleError(errorMessage) {
            this.errorMessage = errorMessage;
            this.results = [];
        },
        handleLoading(isLoading) {
            this.isLoading = isLoading;
        },
    }
};
</script>

```

Este es un ejemplo de cómo utilizar el componente SearchBox. Los eventos **results**, **search-error** y **loading** son manejados en los métodos **handleResults**, **handleError** y **handleLoading** respectivamente. Estos métodos actualizan la data del componente en respuesta a los resultados de la búsqueda, a los errores y al estado de carga.


## Demostracion
El ejemplo anterior se encuentra en el archivo *App.vue*, este componente utiliza [MockAPI](https://mockapi.io/) como una API de prueba para simular interacciones con una API real y se visualiza de la siguiente manera: 

**Visualización de la caja de texto vacia**

![search box](https://github.com/MileydyMtz/vue-search-box-component/assets/85470047/3780599c-ee24-4e29-98a5-c67b8a4e455a)

**Visualizacion del loading**

![search box loading](https://github.com/MileydyMtz/vue-search-box-component/assets/85470047/af892641-f157-44b1-a905-a4c73566f4eb)

**Visualizacion de los resultados**

![search box results](https://github.com/MileydyMtz/vue-search-box-component/assets/85470047/de03af29-eb5e-43f8-b270-753a3540c72c)

**Mensaje de error si no se encuentran resultados**

![search box error](https://github.com/MileydyMtz/vue-search-box-component/assets/85470047/51f2ab82-8df4-4668-a5c8-9a385790dec1)


## Pruebas
Las pruebas se han implementado utilizando la biblioteca vitest para correr las pruebas y @vue/test-utils para montar el componente. Además, se usa axios-mock-adapter para simular las respuestas de la API.
A continuacion se muestran las pruebas implementadas:
* **renders properly**: Verifica que el componente se renderiza correctamente.
* **updates searchQuery when input changes**: Verifica que la propiedad searchQuery se actualiza cuando el valor del campo de entrada cambia.
* **emits loading event when performSearch is called**: Verifica que el evento loading se emite cuando se llama al método performSearch.
* **emits results when search is successful**: Verifica que el evento results se emite cuando la búsqueda se realiza con éxito y devuelve los resultados esperados.
* **emits search-error when search fails**: Verifica que el evento search-error se emite cuando la búsqueda falla.

