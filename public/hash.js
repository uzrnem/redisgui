(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.HashType = factory());
}(this, function () { 'use strict';

  var HashType = Vue.component('hash-type', {
    props: ['currObj', 'refresh'],
    methods: {
      saveHash: async function(item, value) {
        var res = await axios.post('hash/'+this.currObj.key+'/'+item+'/'+value)
        this.refresh(this.currObj.key, null)
        this.$emit('show-alert', "Item Added" )
      },
      removeHash: async function(item) {
        var res = await axios.delete('hash/'+this.currObj.key+'/'+item)
        this.refresh(this.currObj.key, 'hash')
        this.$emit('show-alert', "Item Removed" )
      },
    },
    template: `<div>
      <div class="form-group">
        <label for="remark">Key Value</label>
      </div>
      <div class="input-group mb-2">
        <input type="text" class="form-control" placeholder="key" v-model="currObj.hash_item">
        <input type="text" class="form-control" placeholder="value" v-model="currObj.hash_value">
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-1">
        <a class="btn btn-warning btn-sm" @click="saveHash(currObj.hash_item, currObj.hash_value)">Add</a>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Value</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="value, item in currObj.data">
            <td><span class="mx-3">{{item}}</span></td>
            <td><span class="mx-3">{{value}}</span></td>
            <td>
              <a class="btn btn-link p-1" @click="removeHash(item)">remove</a>
            </td>
          </tr>
          <tr v-if="!currObj.data || currObj.data.length == 0">
            <td colspan="3" class="text-center"><span>No Record Found!</span></td>
          </tr>
        </tbody>
      </table>
    </div>`
  })
  return HashType;
}));
