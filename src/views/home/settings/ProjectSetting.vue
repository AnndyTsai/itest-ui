<template>
    <div class="x-project">
        <div class="x-project-select">
            <div :class="'x-project-select-add' + (activeView === projectViews.add ? ' x-project-select-active' : '')" @click="goAction($event)" :id="projectViews.add">Add</div>
            <div :class="'x-project-select-searchEdit' + (activeView === projectViews.searchEdit ? ' x-project-select-active' : '')" @click="goAction($event)" :id="projectViews.searchEdit">Search&Edit</div>
        </div>
        <div class="x-project-content">
            <div class="x-project-add" v-if="activeView === projectViews.add">
                <el-form :model="project" ref="projectAddForm" :rules="addRules" label-width="8rem">
                    <el-form-item style="width: 30rem;"><span style="font-size: 1.5rem;">Add a new project.</span></el-form-item>
                    <el-form-item label="Name" prop="projectName" style="width: 30rem;">
                        <el-input v-model="project.projectName"></el-input>
                    </el-form-item>
                    <el-form-item label="Description" prop="projectDescription" style="width: 30rem;">
                        <el-input v-model="project.projectDescription"></el-input>
                    </el-form-item>
                    <el-form-item style="width: 30rem;">
                        <el-button type="success" @click="doSaveProject">Save</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="x-project-search-edit" v-if="activeView === projectViews.searchEdit">
                <div class="x-project-search-pagination">
                    <el-pagination></el-pagination>
                </div>
                <div class="x-project-searchParams-list">
                    <div class="x-project-search-params">

                    </div>
                    <div class="x-project-list">

                    </div>
                </div>


            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'ProjectSetting',
        data(){
            var pvs = {add : 'add', searchEdit : 'searchEdit'};
            return {
                projectViews : pvs,
                activeView : pvs.add,
                project : {projectId : '', projectName : '', projectDescription : '', creator : '', createTime : '', updateTime : ''},
                projectSearchParams : {

                },

                addRules : {
                    projectName : [{required : true, message : 'Project name cannot be empty!', trigger : 'blur'}],
                    projectDescription : [],
                }
            }
        },
        methods : {
            goAction(event){
                this.activeView = event.target.id;
            },
            doSaveProject(){
                /**
                 * 保存项目及更新全局项目集
                 */

            }
        },
        computed : {
            //全局项目集
            projectList(){return this.$store.getters.PROJECT_LIST;}
        }
    };
</script>

<style lang="scss">
    @import "../../../style/main";
    *{@include user-select;}
    .x-project{
        .x-project-select{
            @include width-height(100%, 2rem); line-height: 2rem;
            display: flex; flex-direction: row; border-bottom: 1px solid rgba(0,0,0,0.2);
            .x-project-select-add, .x-project-select-searchEdit{
                @include width-height(6rem, 2rem);
                font-size: 1.2rem;
                opacity: .3;
                &:hover{opacity: 1;}
            }
            .x-project-select-add{
                background-color: rgba(154,227,150,1);
            }
            .x-project-select-searchEdit{
                background-color: rgba(56,103,227,1);
            }
            .x-project-select-active{opacity: 1;}
        }

        .x-project-content{
            @include width-height(100%, calc(100% - 3rem));
            @include margin-t-r-b-l(1rem, null, null, null);
            .x-project-add{

            }
            .x-project-search-edit{

                .x-project-searchParams-list{
                    @include width-height(100%, calc(100% - 2rem));
                    border: 1px solid;
                    .x-project-search-params{

                    }
                    .x-project-list{

                    }
                }

                .x-project-search-pagination{
                    @include width-height(100%, 2rem);
                    position: fixed;
                    bottom: 2rem;
                    border: 1px solid;
                }
            }
        }

    }
</style>
