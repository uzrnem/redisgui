(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.GeoLocationType = factory());
}(this, function () { 'use strict';

  var GeoLocationType = Vue.component('geo-location', {
    props: ['currObj', 'refresh'],
    methods: {
      saveGeoLoc: async function(currObj) {
        var res = await axios.post('geol/'+this.currObj.key+'/'+this.currObj.location, {
          lat: this.currObj.lat,
          lng: this.currObj.lng
        })
        if (res.data && res.data.code && res.data.code == "ERR") {
          this.$emit('show-alert', "Error" )
        } else {
          this.refresh('geol')
          this.$emit('show-alert', "Location Added" )
        }
      },
      removeGeoLoc: async function(location) {
        var res = await axios.delete('geol/'+this.currObj.key+'/'+location)
        if (res.data && res.data.code && res.data.code == "ERR") {
          this.$emit('show-alert', "Error" )
        } else {
          this.refresh('geol')
          this.$emit('show-alert', "Location Removed" )
        }
      },
      edit: function(name, loc) {
        this.currObj.location = name
        this.currObj.lat = loc.lat
        this.currObj.lng = loc.lng
        this.$forceUpdate();
      }
    },
    template: `<div>
      <div class="form-group">
        <label for="remark">Location and Lat/Lng</label>
        <div class="input-group mb-2">
          <input type="text" class="form-control" placeholder="Location" v-model="currObj.location">
          <input type="text" class="form-control" placeholder="Latitude" v-model="currObj.lat">
          <input type="text" class="form-control" placeholder="Longitude" v-model="currObj.lng">
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-1">
          <a class="btn btn-warning btn-sm" @click="saveGeoLoc(currObj)">Add</a>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Location</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="loc, name in currObj.data">
            <td><span class="mx-3">{{name}}</span></td>
            <td><span class="text-break mx-3">{{loc.lat}}</span></td>
            <td><span class="text-break mx-3">{{loc.lng}}</span></td>
            <td>
              <a class="btn btn-link p-1" @click="edit(name, loc)">edit</a>
            </td>
            <td>
              <a class="btn btn-link p-1" @click="removeGeoLoc(name, loc)">remove</a>
            </td>
          </tr>
          <tr v-if="currObj.data == null || Object.keys(currObj.data).length === 0">
            <td colspan="5" class="text-center"><span>No Record Found!</span></td>
          </tr>
        </tbody>
      </table>
    </div>`
  })
  return GeoLocationType;
}));
