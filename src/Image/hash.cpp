#include<bits/stdc++.h>
using namespace std;

#define ll long long
vector<ll>p(10);

//Pre-Calc Power Of 31 For Uses In Hash Function 1
void init(){
    p[0]=1;
    for(ll i=1;i<10;i++){
        p[i]=p[i-1]*31;
    }  
}

//Random Unique String Generation
vector<string> string_gen(ll n){
    srand(time(0));
    string s;
    ll sz=0;
    vector<string>v(n);
    map<string,ll>mp;

    while(sz!=n){
        s="";
        for(ll i=0;i<7;i++){
            s+=('a'+rand()%26);
        }
        if(mp[s]==0){
            v[sz]=s;
            mp[s]++;
            sz++;
        }
    }
    return v;
}

//Polynomial Rolling Hash Function
ll hash_func1(string s,ll n){
    ll hash=0,i;
    for(i=0;i<s.size();i++){
        hash+=s[i]*p[i];
    }
    return hash%n;
}

//djb2 Hash Function  
ll hash_func2(string s,ll n){
    ll hash=5381,i;
    for(i=0;i<s.size();i++){
        hash = ((hash<<5)+hash)+s[i]; // hash *33 +s[i] , bit shifts are used for faster multiplication
    }
    return hash%n;
}

//Check Unique Hash Value For Hash Function 1 
ll chk_hash_func1(const vector<string>&v,ll n){
    ll i,hash,res=0;
    map<ll,ll>mp;
    for(i=0;i<v.size();i++){
        hash=hash_func1(v[i],n);
        if(mp[hash]==0){
            res++;
        }
        mp[hash]++;
    }
    return res;
}

//Check Unique Hash Value For Hash Function 2
ll chk_hash_func2(const vector<string>&v,ll n){
    ll i,hash,res=0;
    map<ll,ll>mp;
    for(i=0;i<v.size();i++){
        hash=hash_func2(v[i],n);
        if(mp[hash]==0){
            res++;
        }
        mp[hash]++;
    }
    return res;
}

//For Closed Addressing
struct node{
    node* next=NULL; // Link to next element in list
    string key;
    ll value;
};

//For Open Addressing
struct node2{
    string key;
    ll value;
    bool isEmpty=true;
};

//Seperate Chaining
class seperate_chaining_hash{
    private:
    node* hash_table;
    ll n;  //length of hash table
    
    public:

    //Initialize The Hash Table with Given Size 
    seperate_chaining_hash(ll sz){
        n=sz;
        hash_table = new node[n];   
    }

    void insert(string s,ll val){
        ll hash=hash_func1(s,n)%n;
        node* tmp = new node, *ptr;

        tmp->key=s;
        tmp->value=val;
        tmp->next=NULL;

        //cout<<"--->"<<hash<<" "<<tmp->key<<" "<<tmp->value<<endl;

        ptr = (hash_table+hash);
        
        
        while(ptr->next!=NULL){
            if(val>=ptr->value && val<=ptr->next->value){
                tmp->next = ptr->next->next;
                ptr->next = tmp; 
                break;           
            }
            ptr=ptr->next;
            
        }
        if(ptr->next==NULL){
           ptr->next = tmp;
        }

    }

    ll search(string s){
        ll hash=hash_func1(s,n);
        ll res=0;
        node* tmp = (hash_table+hash);
        tmp=tmp->next;

        while(tmp!=NULL){
            if(tmp->key==s){
                res=tmp->value;
                break;
            }
            tmp=tmp->next;
        }
        return res;
    }

    ll remove(string s){
        ll hash=hash_func1(s,n);
        ll res=0;
        node* tmp=(hash_table+hash),*prev;
        prev=tmp;
        tmp=tmp->next;

        while(tmp!=NULL){
            if(tmp->key==s){
                prev->next=tmp->next;
                res=tmp->value;
                delete tmp;
            }
            prev=tmp;
            tmp=tmp->next;
        }

        return res;
    }

    void print(){
        node* tmp;
        for(ll i=0;i<n;i++){
            tmp=(hash_table+i);
            tmp=tmp->next;

            cout<<i<<"---->";
            while(tmp!=NULL){
                cout<<"("<<tmp->key<<" "<<tmp->value<<") ";
                tmp=tmp->next;
            }
            cout<<endl;
        }
    }
};

//Linear Probing
class linear_probing{
    private:
    node2* hash_table;
    ll n;   //length of hash table

    public:
    //Initialize The Hash Table with Given Size 
    linear_probing(ll sz){
        n=sz;
        hash_table = new node2[n];  
    }

    ll insert(string s,ll val){
        ll hash,i,prob=0;
        hash=hash_func1(s,n);
        for(i=0;i<n;i++){
            prob++;
            if((hash_table+(hash+i)%n)->isEmpty==true){
                (hash_table+(hash+i)%n)->key=s;
                (hash_table+(hash+i)%n)->value=val;
                (hash_table+(hash+i)%n)->isEmpty=false;
                break;
            }
        }   
        return prob; 
    }

    //p.first --> value ,p.second --> number of probs
    pair<ll,ll> search(string s){
        ll hash,prob=0,res=0,i;
        hash=hash_func1(s,n);

        for(i=0;i<n;i++){
            prob++;
            if((hash_table+(hash+i)%n)->isEmpty==false && (hash_table+(hash+i)%n)->key==s){
                res=(hash_table+(hash+i)%n)->value;
                break;
            }
        }   
        return make_pair(res,prob); 
    }

    //p.first --> value ,p.second --> number of probs
    pair<ll,ll> remove(string s){
        ll hash,prob=0,res=0,i;
        hash=hash_func1(s,n);

        for(i=0;i<n;i++){
            prob++;
            if((hash_table+(hash+i)%n)->isEmpty==false && (hash_table+(hash+i)%n)->key==s){
                res=(hash_table+(hash+i)%n)->value;
                
                (hash_table+(hash+i)%n)->isEmpty=true;
                break;
            }
        }   
        return make_pair(res,prob); 
    }

    void print(){
        for(ll i=0;i<n;i++){
            cout<<i<<"--> ";

            if((hash_table+i)->isEmpty==false){
                cout<<"("<<(hash_table+i)->key<<" "<<(hash_table+i)->value<<")";
            }
            cout<<endl;
        }
    }

};

//Quadratic Probing
class quadratic_probing{
    private:
    node2* hash_table;
    ll n;   //length of hash table
    ll c1=29;
    ll c2=37;

    public:
    //Initialize The Hash Table with Given Size 
    quadratic_probing(ll sz){
        n=sz;
        hash_table = new node2[n];  
    }

    ll insert(string s,ll val){
        ll hash,i,prob=0;
        hash=hash_func1(s,n);
        for(i=0;i<n;i++){
            prob++;
            if((hash_table+(hash+c1*i+c2*i*i)%n)->isEmpty==true){
                (hash_table+(hash+c1*i+c2*i*i)%n)->key=s;
                (hash_table+(hash+c1*i+c2*i*i)%n)->value=val;
                (hash_table+(hash+c1*i+c2*i*i)%n)->isEmpty=false;
                break;
            }
        }   
        return prob; 
    }

    //p.first --> value ,p.second --> number of probs
    pair<ll,ll> search(string s){
        ll hash,prob=0,res=0,i;
        hash=hash_func1(s,n);

        for(i=0;i<n;i++){
            prob++;
            if((hash_table+(hash+c1*i+c2*i*i)%n)->isEmpty==false && (hash_table+(hash+c1*i+c2*i*i)%n)->key==s){
                res=(hash_table+(hash+c1*i+c2*i*i)%n)->value;
                break;
            }
        }   
        return make_pair(res,prob); 
    }

    //p.first --> value ,p.second --> number of probs
    pair<ll,ll> remove(string s){
        ll hash,prob=0,res=0,i;
        hash=hash_func1(s,n);

        for(i=0;i<n;i++){
            prob++;
            if((hash_table+(hash+c1*i+c2*i*i)%n)->isEmpty==false && (hash_table+(hash+c1*i+c2*i*i)%n)->key==s){
                res=(hash_table+(hash+c1*i+c2*i*i)%n)->value;
                
                (hash_table+(hash+c1*i+c2*i*i)%n)->isEmpty=true;
                break;
            }
        }   
        return make_pair(res,prob); 
    }

    void print(){
        for(ll i=0;i<n;i++){
            cout<<i<<"--> ";

            if((hash_table+i)->isEmpty==false){
                cout<<"("<<(hash_table+i)->key<<" "<<(hash_table+i)->value<<")";
            }
            cout<<endl;
        }
    }

};

//Double Hashing
class double_hashing{
    private:
    node2* hash_table;
    ll n;   //length of hash table

    public:
    //Initialize The Hash Table with Given Size 
    double_hashing(ll sz){
        n=sz;
        hash_table = new node2[n];  
    }

    ll insert(string s,ll val){
        ll hash1,hash2,i,prob=0;
        hash1=hash_func1(s,n);
        hash2=hash_func2(s,n);

        for(i=0;i<n;i++){
            prob++;
            if((hash_table+(hash1+i*hash2)%n)->isEmpty==true){
                (hash_table+(hash1+i*hash2)%n)->key=s;
                (hash_table+(hash1+i*hash2)%n)->value=val;
                (hash_table+(hash1+i*hash2)%n)->isEmpty=false;
                break;
            }
        }   
        return prob; 
    }

    //p.first --> value ,p.second --> number of probs
    pair<ll,ll> search(string s){
        ll hash1,hash2,i,prob=0,res;
        hash1=hash_func1(s,n);
        hash2=hash_func2(s,n);

        for(i=0;i<n;i++){
            prob++;
            if((hash_table+(hash1+i*hash2)%n)->isEmpty==false && (hash_table+(hash1+i*hash2)%n)->key==s){
                res=(hash_table+(hash1+i*hash2)%n)->value;
                break;
            }
        }   
        return make_pair(res,prob); 
    }

    //p.first --> value ,p.second --> number of probs
    pair<ll,ll> remove(string s){
        ll hash1,hash2,i,prob=0,res;
        hash1=hash_func1(s,n);
        hash2=hash_func2(s,n);

        for(i=0;i<n;i++){
            prob++;
            if((hash_table+(hash1+i*hash2)%n)->isEmpty==false && (hash_table+(hash1+i*hash2)%n)->key==s){
                res=(hash_table+(hash1+i*hash2)%n)->value;
                
                (hash_table+(hash1+i*hash2)%n)->isEmpty=true;
                break;
            }
        }   
        return make_pair(res,prob); 
    }

    void print(){
        for(ll i=0;i<n;i++){
            cout<<i<<"--> ";

            if((hash_table+i)->isEmpty==false){
                cout<<"("<<(hash_table+i)->key<<" "<<(hash_table+i)->value<<")";
            }
            cout<<endl;
        }
    }

};