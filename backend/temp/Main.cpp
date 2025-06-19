// Write your C++ code here
// Write your C++ code here
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;  // value -> index

    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];

        if (mp.find(complement) != mp.end()) {
            return {mp[complement], i};  // Found the pair
        }

        mp[nums[i]] = i;
    }

    return {};  // No solution
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;

    vector<int> result = twoSum(nums, target);
    if (!result.empty()) {
        cout << "[" << result[0] << "," << result[1] << "]" << endl;
    } else {
        cout << "No valid pair found!" << endl;
    }

    return 0;
}
