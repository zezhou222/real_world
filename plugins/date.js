import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('date', (v, formatV="YYYY-MM-DD HH:mm:ss")=>{
  return dayjs(v).format(formatV)
})
