<template>
	<div>
		<form @submit.prevent="editando ? editarLibro() : agregarLibro()">
			<h2>Examen 2do Parcial</h2><h3>José Daniel Hermosillo López (329694)</h3>
			<br><h3>Título / Autor</h3>
			<p>	
				<input type="text" v-model="titulo" id="inputTitulo">
				<input type="text" v-model="autor" id="inputAutor">
				<button type="enviar" id="botonEnviar">{{editando ? "Editar" : "Agregar"}}
				</button>
				<button v-if="editando" @click="cancelarEditar()">Cancelar</button>
			</p>
		</form><br>
		<img src="@/assets/cargando.gif" v-if="cargando">
		<ul>
			<li v-for="libro in libros" :key="libro.id">
				{{libro.titulo}}<span id="autor"> / por {{libro.autor}}</span>
				<span id="buttons">
				<button @click="seleccionarLibro(libro)">Editar</button>
				<button @click="eliminarLibro(libro)">Eliminar</button></span>
			</li>
		</ul>
	</div>
</template>

<script>
	import {db} from './firebase'
	export default {
		name: 'App',
		data() {
			return {
				libros: [],
				id: "",
				titulo: "",
				autor: "",
				cargando: false,
				editando: false
			}
		},
		created() {
			this.listarLibros()
		},
		methods: {
			async listarLibros() {
				this.cargando = true
				const data = await db.collection("libros").get()
				this.libros = data.docs.map(doc => ({
					id: doc.id, ...doc.data()
				}))
				this.cargando = false
			},
			async agregarLibro() {
				await db.collection('libros').add({titulo: this.titulo, autor: this.autor})
				this.titulo = ""
				this.autor = ""
				this.listarLibros()
			},
			async eliminarLibro(libro) {
				if(confirm(`Do you really want to delete ${libro.titulo}, by ${libro.autor}?`)) {
					this.cargando = true
					await db.collection('libros').doc(libro.id).delete()
					this.cargando = false
					this.listarLibros()
				}
			},
			seleccionarLibro(libro) {
				this.editando = true
				this.id = libro.id
				this.titulo = libro.titulo
				this.autor = libro.autor
			},
			async editarLibro() {
				await db.collection('libros').doc(this.id).set({
					titulo: this.titulo,
					autor: this.autor
				})
				this.editando = false
				this.id = ""
				this.titulo = ""
				this.autor = ""
				this.listarLibros()
			},
			cancelarEditar() {
				this.editando = false
				this.titulo = ''
				this.autor = ''
			}
		}
	}
</script>