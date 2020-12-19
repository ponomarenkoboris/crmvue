import firebase from 'firebase/app'

export default {
    actions: {
        async actionUpdateCategory({commit, dispatch}, {title, limit, id}) {
            try {
                const uid = await dispatch('getUid');
                await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit});
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchedCategories({commit, dispatch}) {
            try {
                const uid = await dispatch('getUid');
                const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {};
                // const cats = []
                // Object.keys(categories).forEach(key => {
                //     cats.push({
                //         title: categories[key].title,
                //         limit: categories[key].limit,
                //         id: key
                //     })
                // })
                // return cats
                return Object.keys(categories).map(item => ({...categories[item], id: item}));
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async createCategory({commit, dispatch}, {title, limit}) {
            try {
                const uid = await dispatch('getUid');
                const category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit});
                return {title, limit, id: category.key}
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchedCategoryById({commit, dispatch}, id) {
            try {
                const uid = await dispatch('getUid');
                const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {};
                return {...category, id}
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
    }
}