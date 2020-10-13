<template>
  <v-layout :wrap="true">
    <v-flex xs12>
      <v-card>
        <h1 v-html="title" class="text-center"></h1>
      </v-card>
      <v-card>
        <v-date-picker 
          v-model="fecha"
          full-width
          locale="es-es"
          :min="minDate"
          :max="maxDate"
          @change="getEuro(fecha)">
        </v-date-picker>
      </v-card>
      <v-card color="error" dark>
        <v-card-text class="display-1 text-center">
          {{ value }}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
import {mapMutations}from  'vuex'

export default {
  name: 'Home',
  data(){
    return{
      title:'Cambio Peso Chileno - Euro',
      fecha:new Date().toISOString().substr(0,10),
      minDate:'1984',
      maxDate:new Date().toISOString().substr(0,10),
      value:null
    }
  },
  methods:{
    ...mapMutations(['mostrarLoading','ocultarLoading']),


    async getEuro(day){
      let ddmmyy = day.split('-').reverse().join('-')

      try{
        this.mostrarLoading({titulo:'Accediendo a info', color:'secondary'})

        let euroInfo = await axios.get(`https://mindicador.cl/api/euro/${ddmmyy}`)
        console.log(euroInfo.data.serie)
        if(euroInfo.data.serie.length > 0){
          this.value = await euroInfo.data.serie[0].valor
        } else{
          this.value = 'Sin resultados'
        }

      } catch (error){

      }
      finally{
        this.ocultarLoading()
      }
    },
  },
  created(){
    this.getEuro(this.fecha)
  }
}
</script>
