#include<bits/stdc++.h>
#include <chrono>

using namespace std;
using namespace std::chrono;


typedef long long ll;
typedef vector<int > vi;
typedef vector<long long> vll;

int h1(string &key,int tableSize){
	int hashVal = 0;
	for(int i = 0; i<key.length();  i++){

		hashVal = 37*hashVal+key[i];
		hashVal %= tableSize;
		if(hashVal<0){

			hashVal += tableSize;
		}
	}
	return hashVal;
}
int h2(string &s, int tableSize)
{
   unsigned h = 31;
   for (int i=0;i<s.size();i++) {
     h = (31 * 54059) ^ (s[0] * 76963);
   }
   return h%tableSize; // or return h % C;
}

struct Node{
	string key;
	int value;
	Node *next = NULL;
};

class Seperate_Chaining{
	Node *hash;
	int n;
public:
	Seperate_Chaining(int n){
		this->n = n;
		hash = new Node[n];
	}
	void insert(string s,int value){
		Node *nd = new Node;
		Node *ptr;
		nd->key = s;
		nd->value = value;
		nd->next = NULL;

		int index = h1(s,n);
		ptr = hash+index;

		while(ptr->next!=NULL){
			if(ptr->value <= nd->value && ptr->next->value >= nd->value){
				nd->next = ptr->next;
				ptr->next = nd;
				break;
			}
			ptr = ptr->next;
		}

		if(ptr->next == NULL){
			ptr->next = nd;
		}
	}

	int Delete(string s){

		int index = h1(s,n);

		Node *ptr = hash+index , *pre = NULL ;

		pre = ptr;
		
		ptr = ptr->next;

		while(ptr != NULL){
			if(ptr->key == s){
				pre->next = ptr->next;
				delete ptr;
				return 1;
			}
			pre = ptr;
			ptr = ptr->next;
		}
		
		return 0;

	}
	int search(string s){

		int index = h1(s,n);

		Node *ptr = hash+index;

		while(ptr->next!=NULL){
			if(ptr->key == s){
				return ptr->value;

			}
			ptr = ptr->next;
		}

		return 0;
	}


};


struct closedNode{
	int value;
	string key;
	int check = 0;
};

class LinearProbing{

	closedNode *hash;
	int n;	
public:

	LinearProbing(int n){
		this->n = n;
		hash = new closedNode[n];
	}

	int insert(string s, int value){
		int index = h1(s,n);
		int prob = 0;

		int i = 0;
		int x = (index)%n;
		while((hash+x)->check != 0 && i<n){
			x = (index+i)%n;
			prob++;
			i++;
			if(i==n)break;

		}	
		if((hash+x%n)->check == 0){
			(hash+x%n)->check = 1;
			(hash+x%n)->key = s;
			(hash+x%n)->value = value;
		}
		

		return prob;

	}
	pair<int,int> search(string s){
		int index = h1(s,n),prob = 1;
		int v1 = 0, p1 = 0;

		int i = 0;
		int x = (index+i)%n;
		while(((hash+x)->check == 0 || (hash+x)->key !=s) && i<n){
			x = (index+i)%n;
			prob++;
			i++;
			if(i==n)break;
		}

		if((hash+x%n)->check == 1 && (hash+x%n)->check == 1){
			v1= (hash+x%n)->value ;
			p1 = prob;
		}
		
		return {v1,p1};
	}

	pair<int,int> Delete(string s){
		int index = h1(s,n),prob = 1;
		int v1 = 0, p1 = 0;

		int i = 0;
		int x = (index+i)%n;
		while(((hash+x)->check == 0 || (hash+x)->key !=s) && i<n){
			x = (index+i)%n;
			prob++;
			i++;
			if(i==n)break;
		}

		if((hash+x%n)->check == 1 && (hash+x%n)->key == s){
			v1= (hash+x%n)->value ;
			p1 = prob;
			(hash+x%n)->check = 0;
		}
		return {v1,p1};
	}

	void print(){
		for(int i=0;i<n;i++){
			cout<<(hash+i)->key<<'\n';
		}
	}
	vector<string> getKeys(){
		vector<string>s;
		for(int i=0;i<n;i++){
			if((hash+i)->check==1)s.push_back(hash[i].key);
		}
		return s;
	}
};


class QuadraticProbing{
	closedNode *hash;
	int n;
	int c1 = 41 , c2 = 61;
public:
	QuadraticProbing(int n){
		this->n = n;
		hash = new closedNode[n];
	}
	int insert(string s, int value){
		int index = h1(s,n);
		int prob = 1;

	
		int i = 0;
		int x = (index)%n;
		while((hash+x)->check != 0 && i<n){
			x = (index+c1*i+c2*i*i)%n;
			prob++;
			i++;
			if(i==n)break;
		}	
		if((hash+x%n)->check == 0){
			(hash+x%n)->check = 1;
			(hash+x%n)->key = s;
			(hash+x%n)->value = value;
		}
		

		return prob;

	}
	pair<int,int> search(string s){
		int index = h1(s,n),prob = 1;
		int v1 = 0, p1 = 0;

		
		int i = 0;
		int x = (index+i*c1+c2*i*i)%n;
		while(((hash+x)->check == 0 || (hash+x)->key !=s) && i<n){
			x = (index+i*c1+c2*i*i)%n;
			prob++;
			i++;
			if(i==n)break;
		}

		if((hash+x%n)->check == 1 && (hash+x%n)->key == s){
			v1= (hash+x%n)->value ;
			p1 = prob;
		}
		
		return {v1,p1};
	}

	pair<int,int> Delete(string s){
		int index = h1(s,n),prob = 1;
		int v1 = 0, p1 = 0;
		
		
		int i = 0;
		int x = (index+i*c1+c2*i*i)%n;
		while(((hash+x)->check == 0 || (hash+x)->key !=s) && i<n){
			x = (index+c1*i+c2*i*i)%n;
			prob++;
			i++;
			if(i==n)break;
		}

		if((hash+x%n)->check == 1 && (hash+x%n)->key == s){
			v1= (hash+x%n)->value ;
			p1 = prob;

			(hash+x%n)->check = 0;
		}
		return {v1,p1};
	}
	void print(){
		for(int i=0;i<n;i++){
			cout<<hash[i].key<<'\n';
		}
	}
	vector<string> getKeys(){
		vector<string>s;
		for(int i=0;i<n;i++){
			if((hash+i)->check == 1)s.push_back(hash[i].key);
		}
		return s;
	} 
};

class DoubleHashing{

	closedNode *hash;
	int n;
public:
	DoubleHashing(int n){
		this->n = n;
		hash = new closedNode[n];
	}

	int insert(string s, int value){
		int idx1 = h1(s,n);
		int idx2 = h2(s,n);
		int prob = 1;

		int i = 0;
		int x = (idx1+i*idx2)%n;
		while((hash+x)->check != 0 && i<n){
			x = (idx1+i*idx2)%n;

			prob++;
			i++;

			if(i==n)break;
		}

		if((hash+x%n)->check == 0){
			(hash+x%n)->check = 1;
			(hash+x%n)->key = s;
			(hash+x%n)->value = value;
		}
		return prob;
	}

	pair<int,int> search(string s){
		int idx1 = h1(s,n);
		int idx2 = h2(s,n);
		int prob = 1;
		int v1 = 0, p1 = 0;

		
		int i = 0;
		int x = (idx1+i*idx2)%n;
		while(((hash+x)->check == 0 || (hash+x)->key !=s) && i<n){
			x = (idx1+i*idx2)%n;
			prob++;
			i++;
			if(i==n)break;
		}

		if((hash+x%n)->check == 1 && (hash+x%n)->key == s){
			v1= (hash+x%n)->value ;
			p1 = prob;
		}
		
		return {v1,p1};
	}

	pair<int,int> Delete(string s){
		int idx1 = h1(s,n);
		int idx2 = h2(s,n);
		int prob = 1;
		int v1 = 0, p1 = 0;

		
		int i = 0;
		int x = (idx1+i*idx2)%n;
		while(((hash+x)->check == 0 || (hash+x)->key !=s) && i<n){
			x = (idx1+i*idx2)%n;
			prob++;
			i++;
			if(i==n)break;
		}

		if((hash+x%n)->check == 1 && (hash+x%n)->key == s){
			v1= (hash+x%n)->value ;
			p1 = prob;

			(hash+x%n)->check = 0;
		}
		return {v1,p1};
	}
	void print(){
		for(int i=0;i<n;i++){
			cout<<hash[i].key<<'\n';
		}
	}
	vector<string> getKeys(){
		vector<string>s;
		for(int i=0;i<n;i++){
			if((hash+i)->check==1){
				s.push_back((hash+i)->key);
			}
		}
		return s;
	}
};

int main() 
{
    ios::sync_with_stdio(0);
    cin.tie(0);

    ll n;
    cin>>n;
    map<string,int> mp;
    vector<string> str;

    ll lof = .6;

    int m = n*.4;
    int j=1;

    while(j<=m){
    	string s="";
    	for(ll i=0;i<7;i++){
    		s+=rand()%26+'a';
    	}
    	if(mp[s]==0){
    		mp[s] = j;
    		str.push_back(s);
    		j++;
    	}
    } 

// //................................................................//

//     LinearProbing lp(n);

//     for(auto i:str){
//     	lp.insert(i,mp[i]);
//     }
// //.......................Hash Element.......................//
//     vector<string> keys = lp.getKeys();

// //...................... Search 10% ......................//
//     ll p = m*.1;
//     vector<string> forSearch;

//     for(ll i = 0;i<p;i++){

//     	ll x = rand()%(keys.size());

//     	forSearch.push_back(keys[x]);
//     }

//     auto start = high_resolution_clock::now();
//     int x = 0 ;
//     for(auto i:forSearch){
//     	x += lp.search(i).second;
//     }
//     cout<<(x/forSearch.size())<<'\n';

//     auto stop = high_resolution_clock::now();
 	
//     auto duration = duration_cast<nanoseconds>(stop - start);

//     cout<<duration.count()<<'\n';
// //.....................DELETE 10% ......................//

//     p = m*.1;
//     vector<string> forDelete;

//     for(ll i = 0;i<p;i++){

//     	ll x = rand()%(keys.size());
//     	forDelete.push_back(keys[x]);
//     }

//     x = 0 ;
//     for(auto i:forDelete){
//     	x += lp.Delete(i).second;
//     }

//  //....................Search After Delete .......................//

//     keys = lp.getKeys();
//     p = m*.1;

//     vector<string> afterDel;

//     for(ll i = 0;i<p/2;i++){
//     	ll x = rand()%(forDelete.size());
//     	afterDel.push_back(forDelete[x]);

//     	x = rand()%(keys.size());
//     	afterDel.push_back(keys[x]);
//     }
//     start = high_resolution_clock::now();
//     x = 0 ;
//     for(auto i:afterDel){
//     	x += lp.search(i).second;
//     }
//     cout<<(x/afterDel.size())<<'\n';
//     stop = high_resolution_clock::now();
//     duration = duration_cast<nanoseconds>(stop - start);
//     cout<<duration.count()<<'\n';

//     //.........................................................//




//................................................................//

    Seperate_Chaining lp(n);

    for(auto i:str){
    	lp.insert(i,mp[i]);
    }
//.......................Hash Element.......................//

//...................... Search 10% ......................//
    ll p = m*.1;
    vector<string> forSearch;

    for(ll i = 0;i<p;i++){

    	ll x = rand()%(str.size());

    	forSearch.push_back(str[x]);
    }

    auto start = high_resolution_clock::now();
    int x = 0 ;
    for(auto i:forSearch){
    	lp.search(i);
    }

    auto stop = high_resolution_clock::now();
 	
    auto duration = duration_cast<nanoseconds>(stop - start);

    cout<<duration.count()<<'\n';

//.....................DELETE 10% ......................//

    p = m*.1;
    vector<string> forDelete;

    for(ll i = 0;i<p;i++){

    	ll x = rand()%(str.size());
    	forDelete.push_back(str[x]);
    }

    x = 0 ;
    for(auto i:forDelete){
    	lp.Delete(i);
    }

 //....................Search After Delete .......................//

    p = m*.1;

    vector<string> afterDel;

    for(ll i = 0;i<p/2;i++){
    	ll x = rand()%(forDelete.size());
    	afterDel.push_back(forDelete[x]);

    	x = rand()%(str.size());
    	afterDel.push_back(str[x]);
    }
    start = high_resolution_clock::now();
    x = 0 ;
    for(auto i:afterDel){
    	lp.search(i);
    }
    stop = high_resolution_clock::now();
    duration = duration_cast<nanoseconds>(stop - start);
    cout<<duration.count()<<'\n';

    //.........................................................//

}	
