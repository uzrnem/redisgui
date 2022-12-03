(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.ListType = factory());
}(this, function () { 'use strict';

  var ListType = Vue.component('list-type', {
    data: function() {
      return {
        classes: [
          "bg-primary",
          "bg-secondary",
          "bg-success",
          "bg-warning text-dark",
          "bg-info text-dark",
          "bg-light text-dark",
          "bg-dark"
        ]
      }
    },
    props: ['currObj', 'refresh'],
    methods: {
      leftPush: async function() {
        if (!this.currObj.item || this.currObj.item == '') {
          return
        }
        var res = await axios.post('list/left/'+this.currObj.key+'/'+this.currObj.item)
        this.currObj.item = ''
        this.refresh(this.currObj.key, null)
        this.$emit('show-alert', "Item Added" )
      },
      rightPush: async function() {
        if (!this.currObj.item || this.currObj.item == '') {
          return
        }
        var res = await axios.post('list/right/'+this.currObj.key+'/'+this.currObj.item)
        this.currObj.item = ''
        this.refresh(this.currObj.key, null)
        this.$emit('show-alert', "Item Added" )
      },
      leftPop: async function() {
        var res = await axios.delete('list/left/'+this.currObj.key)
        this.refresh(this.currObj.key, 'list')
        this.$emit('show-alert', "Item Removed" )
      },
      rightPop: async function() {
        var res = await axios.delete('list/right/'+this.currObj.key)
        this.refresh(this.currObj.key, 'list')
        this.$emit('show-alert', "Item Removed" )
      },
    },
    template: `<div>
      <div class="form-group">
        <label for="remark">Item</label>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <a class="input-group-text" @click="leftPush()"
          :class="{disabled: !currObj.item || currObj.item == ''}"
          :disabled="!currObj.item || currObj.item == ''"
          style="border-radius: 0.375rem 0px 0px 0.375rem;"
            >Left Push</a>
        </div>
        <input type="text" class="form-control" v-model="currObj.item">
        <div class="input-group-append">
          <a class="input-group-text" @click="rightPush()"
          :class="{disabled: !currObj.item || currObj.item == ''}"
          :disabled="!currObj.item || currObj.item == ''"
          style="border-radius: 0px 0.375rem 0.375rem 0px;"
            >Right Push</a>
        </div>
      </div>
      <div>
        <a class="badge bg-danger mx-1 my-1" @click="leftPop()"
          v-if="currObj.data && currObj.data.length > 0">Left Pop</a>
        <br>
        <span class="badge mx-1 my-1 text-break" :class="classes[i%7]"
          v-for="item, i in currObj.data">{{item}}</span>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-1">
          <a class="badge bg-danger mx-1 my-1" @click="rightPop()"
            v-if="currObj.data && currObj.data.length > 0">Right Pop</a>
        </div>
      </div>
      <div v-if="currObj.data == null || currObj.data.length == 0">
        <span class="badge bg-secondary">No Record Found!</span></span>
      </div>
    </div>`
  })
  return ListType;
}));
