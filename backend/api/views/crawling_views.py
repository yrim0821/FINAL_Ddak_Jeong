from rest_framework import status
from rest_framework.decorators import api_view
from api.models import Category, Policy, Category_Policy
from rest_framework.response import Response

@api_view(['POST'])
def setCategories(request):
    if request.method == 'POST':
        categories = request.data.get('categories', None)
        for category in categories:
            id = category.get('id', None)
            name = category.get('name', None)
            print("{}, {}".format(id, name))
            Category(id=id, name=name).save()

        return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def setPolicies(request):
    if request.method == 'POST':
        policies = request.data.get('policies', None)
        for policy in policies:
            id = policy.get('id', None)
            title = policy.get('title', None)
            brief = policy.get('brief', None)
            Policy(id=id, title=title, brief=brief).save()

        return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def setCategory_Policy(request):
    if request.method == 'POST':
        list = request.data.get('category_policy', None)
        for li in list:
            category = li.get('category', None)
            policy = li.get('policy', None)
            # print("{}, {}".format(category, policy))
            Category_Policy(category_id=category, policy_id=policy).save()
        return Response(status=status.HTTP_200_OK)

    return Response(status=status.HTTP_200_OK)