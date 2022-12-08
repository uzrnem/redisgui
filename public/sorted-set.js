(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.SortedSetType = factory());
}(this, function () { 'use strict';

  var SortedSetType = Vue.component('sorted-set', {
    props: ['currObj', 'refresh'],
    methods: {
      saveSortedItem: async function(member, score) {
        var res = await axios.post('sorted-set/'+this.currObj.key+'/'+member+'/'+score)
        if (res.data && res.data.code && res.data.code == "ERR") {
          this.$emit('show-alert', "Error" )
        } else {
          this.refresh(this.currObj.key, null)
          this.$emit('show-alert', "Member Added" )
        }
      },
      updateSortedSet: function(member) {
        this.currObj.member = member
        this.currObj.isIncremented = true
        this.$forceUpdate();
      },
      cancel: function() {
        this.currObj.member = ""
        this.currObj.score = ""
        this.currObj.isIncremented = false
        this.$forceUpdate();
      },
      incrSortedItem: async function(member, score) {
        var res = await axios.post('sorted-set/incr/'+this.currObj.key+'/'+member+'/'+score)
        if (res.data && res.data.code && res.data.code == "ERR") {
          this.$emit('show-alert', "Error" )
        } else {
          this.refresh(this.currObj.key, null)
          this.$emit('show-alert', "Member Incremented" )
        }
      },
      removeSortedItem: async function(member) {
        var res = await axios.delete('sorted-set/'+this.currObj.key+'/'+member)
        if (res.data && res.data.code && res.data.code == "ERR") {
          this.$emit('show-alert', "Error" )
        } else {
          this.refresh(this.currObj.key, 'zset')
          this.$emit('show-alert', "Member Removed" )
        }
      },
    },
    template: `<div>
      <template v-if="currObj.isIncremented">
        <div class="form-group">
          <label for="remark">Increment Score of Member <code>{{currObj.member}}</code> by</label>
          <div class="input-group mb-2">
            <input type="text" class="form-control" placeholder="Increment Score" v-model="currObj.score">
          </div>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-1">
            <a class="btn btn-success btn-sm" @click="incrSortedItem(currObj.member, currObj.score)">Increment</a>
            <a class="btn btn-primary btn-sm" @click="cancel()">Cancel</a>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-group">
          <label for="remark">Member Score</label>
          <div class="input-group mb-2">
            <input type="text" class="form-control" placeholder="Member" v-model="currObj.member">
            <input type="text" class="form-control" placeholder="Score" v-model="currObj.score">
          </div>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-1">
            <a class="btn btn-warning btn-sm" @click="saveSortedItem(currObj.member, currObj.score)">Add</a>
          </div>
        </div>
      </template>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Member</th>
            <th scope="col">Score</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="score, member in currObj.data">
            <td><span class="mx-3">{{member}}</span></td>
            <td><span class="text-break mx-3">{{score}}</span></td>
            <td>
              <a class="btn btn-link p-1" @click="updateSortedSet(member)">update</a>
            </td>
            <td>
              <a class="btn btn-link p-1" @click="removeSortedItem(member)">remove</a>
            </td>
          </tr>
          <tr v-if="!currObj.data || currObj.data.length == 0">
            <td colspan="3" class="text-center"><span>No Record Found!</span></td>
          </tr>
        </tbody>
      </table>
    </div>`
  })
  return SortedSetType;
}));
