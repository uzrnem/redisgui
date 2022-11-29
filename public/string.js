(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.StringType = factory());
}(this, function () { 'use strict';

  var StringType = Vue.component('string-type', {
    props: ['currObj'],
    methods: {
      saveString: async function() {
        var res = await axios.post('string', {
          key: this.currObj.key,
          value: this.currObj.data
        })
        this.$emit('show-alert', res.data )
      }
    },
    template: `<div>
      <div class="form-group mb-2">
        <label for="value">Value</label>
        <textarea class="textarea form-control" placeholder="Enter value"
          rows="8" style="padding: 0.25rem;" v-model="currObj.data"> </textarea>
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-1">
        <a class="btn btn-warning btn-sm" @click="saveString()">Save</a>
      </div>
    </div>`
  })
  return StringType;
}));
