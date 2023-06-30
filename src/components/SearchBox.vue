<template>
<div class="search-box">
    <input 
        class="search-input" 
        type="text" 
        :value="searchQuery" 
        @input="updateSearchQuery($event.target.value)" 
        @keydown.enter="performSearch" 
        placeholder="Search here" 
    />
    <button class="search-button" @click="performSearch">
        <img src="@/assets/search.svg" class="search-icon" alt="Buscar">
    </button>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'SearchBoxComponent',
    
    data() {
        return {
            searchQuery: '',
            results: [],
            error: null,
            isLoading: false,
        };
    },
    props: {
        apiUrl: {
            type: String,
            required: true
        },
        searchField: {
            type: String,
            default: 'name'
        }
    },
    methods: {
        updateSearchQuery(value) {
            this.searchQuery = value;
        },
        async performSearch() {
            if (this.searchQuery.trim() === '') {
                return;
            }

            this.isLoading = true;
            this.$emit('loading', this.isLoading);

            try {
                const response = await axios.get(this.apiUrl);
                this.results = response.data.filter(item =>
                    item[this.searchField].toLowerCase().includes(this.searchQuery.toLowerCase())
                );
                this.$emit('results', this.results);
                this.error = null;
            } catch (error) {
                console.error(error);
                this.error = 'Hubo un error al realizar la búsqueda. Por favor, inténtalo de nuevo.';
                this.$emit('search-error', this.error); 

            } finally {
                this.isLoading = false;
                this.$emit('loading', this.isLoading);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
$search-background: #f0f0f0;
$search-border-color: #333333;

.search-box {
    align-items: center;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
    display: flex;
    gap: 1rem;
    justify-content: center;
    position: relative;
}

.search-input {
    background-color: $search-background;
    border-radius: 5px;
    border: 1px solid $search-border-color;
    flex-grow: 1;
    padding: 0.5rem;
    padding-right: 2.2rem;    
}

.search-button {
    background-color: transparent;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    position: absolute;
    right: .5rem;
    transition: transform 0.3s ease;
    
    &:hover {
        transform: scale(1.20);
    }
}

.search-icon {
    width: 1.2rem;
    height: auto;
}

</style>