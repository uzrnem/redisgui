(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.SetType = factory());
}(this, function () { 'use strict';

  var SetType = Vue.component('set-type', {
    props: ['currObj', 'refresh'],
    methods: {
      saveSet: async function(item) {
        var res = await axios.post('set/'+this.currObj.key+'/'+item)
        this.refresh(this.currObj.key, null)
        this.$emit('show-alert', "Item Added" )
      },
      removeSet: async function(item) {
        var res = await axios.delete('set/'+this.currObj.key+'/'+item)
        this.refresh(this.currObj.key, 'set')
        this.$emit('show-alert', "Item Removed" )
      },
    },
    template: `<div>
      <div class="form-group mb-2">
        <label for="remark">Item</label>
        <input type="text" class="form-control" placeholder="Item value" v-model="currObj.set_item">
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-1">
        <a class="btn btn-warning btn-sm" @click="saveSet(currObj.set_item)">Add</a>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Items</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tag in currObj.data">
            <td><span class="mx-3">{{tag}}</span></td>
            <td>
              <a class="btn btn-link p-1" @click="removeSet(tag)">remove</a>
            </td>
          </tr>
          <tr v-if="!currObj.data || currObj.data.length == 0">
            <td colspan="2" class="text-center"><span>No Record Found!</span></td>
          </tr>
        </tbody>
      </table>
    </div>`
  })
  return SetType;
}));
